import Story from '../models/StoryModel';

const controller = {
	getStories(req, res) {
		const errors = [];
		Story.find({ status: 'public' })
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
					res.redirect(`/stories/show/${savedStory._id}`);
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
		Story.findOne({ _id: req.params.id }) // Populates user with all the fields from the users collection - story has a reference to this collection
			.populate('user')
			.then((story) => {
				console.log(story);
				res.render('stories/show', { story });
			})
			.catch((err) => {
				console.log(`ERROR Retrieving story with id --> ${req.body.id}\n${err}`);
				req.flash('error_msg', 'Could not find any stories with that id');
				res.redirect('/stories');
			});
	},
};

export default controller;
