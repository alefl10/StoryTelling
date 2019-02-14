const controller = {
	getIndex(req, res) {
		res.render('index/welcome');
	},

	getDashboard(req, res) {
		res.render('index/dashboard');
	},

	getAbout(req, res) {
		res.render('index/about');
	},
};

export default controller;
