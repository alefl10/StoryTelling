import Story from '../models/StoryModel';

const controller = {
	getIndex(req, res) {
		res.render('index/welcome');
	},

	getDashboard(req, res) {
		Story.find({ user: req.user.id }) // It retrieves all the story that have the same user id
			.then((stories) => {
				res.render('index/dashboard', { stories });
			});
	},

	getAbout(req, res) {
		res.render('index/about');
	},
};

export default controller;
