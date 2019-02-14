const controller = {
	getIndex(req, res) {
		res.render('stories/index');
	},

	getAdd(req, res) {
		res.render('stories/add');
	},
};

export default controller;
