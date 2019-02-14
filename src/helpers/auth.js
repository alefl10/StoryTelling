module.exports = {
	ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { // We have access to req.isAuthenticated because of passport
			return next();
		}
		req.flash('error_msg', 'Not Authorized!');
		res.redirect('/');
	},
	ensureGuest(req, res, next) {
		if (req.isAuthenticated()) { // We have access to req.isAuthenticated because of passport
			return res.redirect('/dashboard');
		}
		return next();
	},
};
