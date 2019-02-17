import Story from '../models/StoryModel';

const controller = {
	getIndex(req, res) {
		res.render('index/welcome');
	},

	getDashboard(req, res) {
		Story.find({ user: req.user.id }) // It retrieves all the story that have the same user id
			.then((stories) => {
				res.render('index/dashboard', { stories });
			})
			.catch((err) => {
				console.log(`ERROR Retrieving stories for user with id --> ${req.body.id}\n${err}`);
				req.flash('error_msg', 'There was an error finding stories for that user');
				res.redirect('/stories');
			});
	},

	getAbout(req, res) {
		res.render('index/about');
	},
};

export default controller;
