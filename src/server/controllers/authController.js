import passport from 'passport';

const controller = {
	getAuth(req, res, next) {
		passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
	},

	getAuthCallback(req, res, next) {
		passport.authenticate('google', { failureRedirect: '/' })(req, res, next);
	},

	getDashboard(req, res, next) {
		res.redirect('/dashboard');
	},
};

export default controller;
