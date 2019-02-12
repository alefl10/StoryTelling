import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { google } from './private';
import User from '../server/models/UserModel';

export default function (passport) {
	passport.use(new GoogleStrategy({
		clientID: google.client_id,
		clientSecret: google.client_secret,
		callbackURL: '/auth/google/callback',
		proxy: true, // Heroku will try to load this application with https. Setting proxy to true prevents it from crashing
	}, (accessToken, refreshToken, profile, done) => {
		const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
		const newUser = new User({
			googleID: profile.id,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile.emails[0].value,
			image,
		});

		// Check for existing user
		User.findOne({ googleID: newUser.googleID })
			.then((user) => {
				if (user) {
					done(null, user);
				} else {
					newUser.save()
						.then((savedUser) => {
							done(null, savedUser);
						})
						.catch(err => done(err, false, { message: 'There was an error saving the User' }));
				}
			})
			.catch(err => done(err, false, { message: 'There was an error retrieving the User' }));
	}));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id)
			.then((user) => {
				done(null, user);
			})
			.catch(err => done(err, false, { message: 'There was an error deserializing the User' }));
	});
}
