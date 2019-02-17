import Story from '../models/StoryModel';

const controller = {
	getStories(req, res) {
		const errors = [];
		Story.find({ status: 'public' })
			.sort('title')
			.populate('user') // Populates user with all the fields from the users collection - story has a reference to this collection
			.then((stories) => {
				console.log(stories);
				res.render('stories/index', { stories });
			})
			.catch((err) => {
				console.log(`ERROR Retrieving Public Stories:\n${err}`);
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
					console.log(`New st0ry was saved:\n${savedStory}`);
					req.flash('success_msg', 'You just added a new story!');
					res.redirect('/dashboard');
				})
				.catch((err) => {
					console.log(err);
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
			.then((story) => {
				console.log(story);
				res.render('stories/show', { story });
			})
			.catch((err) => {
				console.log(`ERROR Retrieving story with id --> ${req.params.id}\n${err}`);
				req.flash('error_msg', 'Could not find any stories with that id');
				res.redirect('/stories');
			});
	},

	getEdit(req, res) {
		Story.findById({ _id: req.params.id })
			.then((story) => {
				console.log(story);
				res.render('stories/edit', { story });
			})
			.catch((err) => {
				console.log(`ERROR Retrieving story with id --> ${req.params.id}\n${err}`);
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

		Story.findOne({ title: req.body.title })
			.then((story) => {
				if (story && story._id.toString() !== req.params.id) {
					console.log(`This title exists already --> ${req.body.title}`);

					const updateStory = {
						body,
						status,
						allowComments,
					};

					Story.findOneAndUpdate(req.params.id, updateStory)
						.then((updatedStory) => {
							console.log(`Story with id --> ${req.params.id} was partially updated updated:\n`, updatedStory);
							req.flash('warning_msg', `Your st0ry could only be partially updated because the title '${req.body.title}' already exists`);
							res.redirect('/dashboard');
						})
						.catch((err) => {
							console.log(`ERROR Updating story with id --> ${req.params.id}\n${err}`);
							req.flash('error_msg', `Could not update st0ry: ${req.body.title}`);
							res.redirect('/dashboard');
						});
				} else {
					const updateStory = {
						title,
						body,
						status,
						allowComments,
					};

					Story.findOneAndUpdate(req.params.id, updateStory)
						.then((updatedStory) => {
							console.log(`Story with id --> ${req.params.id} was updated:\n`, updatedStory);
							req.flash('success_msg', `You successfully updated your st0ry: '${updateStory.title}'`);
							res.redirect('/dashboard');
						})
						.catch((err) => {
							console.log(`ERROR Updating story with id --> ${req.params.id}\n${err}`);
							req.flash('error_msg', `Could not update st0ry: ${req.body.title}`);
							res.redirect('/dashboard');
						});
				}
			})
			.catch((err) => {
				console.log(`ERROR Updating story with title --> ${req.body.title}\n${err}`);
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
				console.log(`ERROR Deleting story with id --> ${req.params.id}\n${err}`);
				req.flash('error_msg', 'There was an error deleting your st0ry');
				res.redirect('/dashboard');
			});
	},
};

export default controller;
