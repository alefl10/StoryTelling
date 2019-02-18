import { Types } from 'mongoose';
import Story from '../models/StoryModel';

const controller = {
	getStories(req, res) {
		const errors = [];
		Story.find({ status: 'public' })
			.sort({ date: 'desc' })
			.populate('user') // Populates user with all the fields from the users collection - story has a reference to this collection
			.then((stories) => {
				res.render('stories/index', { stories });
			})
			.catch((err) => {
				console.log(`ERROR Retrieving Public Stories:\n${err}\n`);
				errors.push({ error_msg: 'There was an ERROR RETRIEVING PUBLIC STORIES' });
				res.render('stories/index');
			});
	},

	getAdd(req, res) {
		res.render('stories/add');
	},

	postStory(req, res) {
		const errors = [];
		let unchecked;
		const {
			title,
			body,
			status,
		} = req.body;

		let { allowComments } = req.body;

		if (body === undefined || body === '') {
			errors.push({ error_msg: 'You cannot submit a story with just a title... Add something to the body!' });
			res.render('stories/add', { errors, title, body });
		} else {
			if (allowComments) {
				allowComments = true;
			} else {
				unchecked = 'unchecked';
				allowComments = false;
			}
			const newStory = new Story({
				title,
				body,
				status,
				allowComments,
				user: req.user.id,
			});

			newStory.save()
				.then((savedStory) => {
					console.log(`New st0ry was saved:\n${savedStory}\n`);
					req.flash('success_msg', 'You just added a new story!');
					res.redirect('/dashboard');
				})
				.catch((err) => {
					console.log(`ERROR Saving new story:\n${err}\n`);
					if (err.code === 11000) {
						errors.push({ error_msg: 'That title has already been used.\nPlease, choose a different title.' });
						res.render('stories/add', {
							errors,
							title,
							body,
							[status]: status,
							unchecked,
						});
					} else {
						errors.push({ error_msg: 'There was a fatal error saving your St0ry' });
						res.render('stories/add', {
							errors,
							title,
							body,
							[status]: status,
							unchecked,
						});
					}
				});
		}
	},

	getStory(req, res) {
		Story.findById({ _id: req.params.id })
			.populate('user') // Populates user with all the fields from the users collection - story has a reference to this collection
			.populate('comments.commentUser')
			.then((story) => {
				console.log(story);
				if (story.status === 'public') {
					res.render('stories/show', { story });
				} else {
					if (req.user) { // Is there a logged in user?
						if (req.user.id.toString() === story.user._id.toString()) {
							res.render('stories/show', { story });
						} else {
							req.flash('error_msg', 'You are not authorized to edit this st0ry');
							res.redirect('/stories');
						}
					} else {
						req.flash('error_msg', 'You need to log in to edit this story');
						res.redirect('/stories');
					}
				}
			})
			.catch((err) => {
				console.log(`ERROR Retrieving story with id --> ${req.params.id}\n${err}\n`);
				req.flash('error_msg', 'Could not find any stories with that id');
				res.redirect('/stories');
			});
	},

	getUserStories(req, res) {
		Story.find({ user: Types.ObjectId(req.params.userId), status: 'public' })
			.populate('user')
			.then((stories) => {
				console.log(stories);
				if (stories) {
					res.render('stories/index', { stories });
				} else {
					req.flash('warning_msg', 'That user does not have any stories or does not exist');
					res.redirect('/stories');
				}
			})
			.catch((err) => {
				console.log(`ERROR Retrieving stories from user with id --> ${req.params.userId}\n${err}\n`);
				req.flash('error_msg', 'Failed to find user or his/her stories');
				res.redirect('/stories');
			});
	},

	getMyStories(req, res) {
		Story.find({ user: Types.ObjectId(req.user.id) })
			.populate('user')
			.then((stories) => {
				console.log(stories);
				if (stories) {
					res.render('stories/index', { stories });
				} else {
					req.flash('warning_msg', 'You are a user with no stories or you do not exist...');
					res.redirect('/stories');
				}
			})
			.catch((err) => {
				console.log(`ERROR Retrieving stories from user with id --> ${req.params.userId}\n${err}\n`);
				req.flash('error_msg', 'Failed to find user or his/her stories');
				res.redirect('/stories');
			});
	},

	getEdit(req, res) {
		Story.findById({ _id: req.params.id })
			.then((story) => {
				console.log('Story to be edited\n', story);
				if (story.user.toString() !== req.user.id.toString()) {
					req.flash('error_msg', 'You are not authorized to edit that story');
					res.redirect('/stories');
				} else {
					res.render('stories/edit', { story });
				}
			})
			.catch((err) => {
				console.log(`ERROR Retrieving story with id --> ${req.params.id}\n${err}\n`);
				req.flash('error_msg', 'Could not find any stories with that id');
				res.redirect('/stories');
			});
	},

	updateOne(req, res) {
		const { title, body, status } = req.body;
		let { allowComments } = req.body;

		if (allowComments) {
			allowComments = true;
		} else {
			allowComments = false;
		}

		Story.findOne({ title })
			.then((story) => {
				if (story && story._id.toString() !== req.params.id.toString()) {
					console.log(`This title exists already --> ${req.body.title}`);

					const updateStory = {
						body,
						status,
						allowComments,
					};

					Story.updateOne({ _id: req.params.id }, updateStory)
						.then(() => {
							console.log(`Story with id --> ${req.params.id} was partially updated updated:\n`);
							req.flash('warning_msg', `Your st0ry could only be partially updated because the title '${title}' already exists`);
							res.redirect('/dashboard');
						})
						.catch((err) => {
							console.log(`ERROR Updating story with id --> ${req.params.id}\n${err}`);
							req.flash('error_msg', `Could not update st0ry: ${req.body.title}`);
							res.redirect('/dashboard');
						});
				} else {
					const updateStory = {
						body,
						status,
						allowComments,
					};
					console.log(updateStory);
					if (!story) {
						updateStory.title = title;
					}

					Story.updateOne({ _id: req.params.id }, updateStory)
						.then(() => {
							console.log(`Story with id --> ${req.params.id} was updated\n`);
							req.flash('success_msg', `You successfully updated your st0ry: '${title}'`);
							res.redirect('/dashboard');
						})
						.catch((err) => {
							console.log(`ERROR Updating story with id --> ${req.params.id}\n${err}\n`);
							req.flash('error_msg', `Could not update st0ry: ${req.body.title}`);
							res.redirect('/dashboard');
						});
				}
			})
			.catch((err) => {
				console.log(`ERROR Updating story with title --> ${req.body.title}\n${err}\n`);
				req.flash('error_msg', 'There was a fatal error updating that title');
				res.redirect('/dashboard');
			});
	},

	deleteOne(req, res) {
		Story.remove({ _id: req.params.id })
			.then((removedStory) => {
				console.log(`Story with id --> ${req.params.id} was removed:\n`, removedStory);
				req.flash('success_msg', 'You successfully removed your st0ry!');
				res.redirect('/dashboard');
			})
			.catch((err) => {
				console.log(`ERROR Deleting story with id --> ${req.params.id}\n${err}\n`);
				req.flash('error_msg', 'There was an error deleting your st0ry');
				res.redirect('/dashboard');
			});
	},

	postComment(req, res) {
		Story.findOne({ _id: req.params.id })
			.then((story) => {
				const newComment = {
					commentBody: req.body.commentBody,
					commentUser: req.user.id,
				};

				// Add to comments array - first element in array
				story.comments.unshift(newComment);
				story.save()
					.then((savedStory) => {
						console.log(`New comment was added to story with id:${savedStory._id}\n`);
						req.flash('success_msg', 'You just added a new comment!');
						res.redirect(`/stories/show/${savedStory._id}`);
					})
					.catch((err) => {
						console.log(`ERROR Saving new story with id --> ${req.params.id}:\n${err}\n`);
						req.flash('error_msg', 'There was a fatal error adding your comment');
						res.redirect('/dashboard');
					});
			});
	},
};

export default controller;
