import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { google } from './private';

export default function (passport) {
	passport.use(new GoogleStrategy({
		clientID: google.client_id,
		clientSecret: google.client_secret,
		callbackURL: '/auth/google/callback',
		proxy: true, // Heroku will try to load this application with https. Setting proxy to true prevents it from crashing
	}, (accessToken, refreshToken, profile, done) => {
		console.log(accessToken);
		console.log(profile);
	}));
}
