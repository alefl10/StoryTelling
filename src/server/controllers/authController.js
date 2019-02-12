import passport from 'passport';

const controller = {
	getAuth(req, res, next) {
		passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
	},

	getAuthCallback(req, res, next) {
		passport.authenticate('google', { failureRedirect: '/' })(req, res, next);
	},

	getDashboard(req, res) {
		res.redirect('/dashboard');
	},

	getLogout(req, res) {
		req.logout();
		res.redirect('/');
	},
};

export default controller;
