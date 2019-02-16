import Story from '../models/StoryModel';

const controller = {
	getIndex(req, res) {
		res.render('stories/index');
	},

	getAdd(req, res) {
		res.render('stories/add');
	},
	getShow(req, res) {
		res.render('stories/show');
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
					req.flash('success_msg', 'You just added a new story!');
					res.redirect('stories/show/');
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
};

export default controller;
