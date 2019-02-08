import passport from 'passport';

const controller = {
	getAuth(req, res, next) {
		passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
	},
};

export default controller;
