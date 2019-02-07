import { db } from './private';

if (process.env.NODE_ENV === 'production') {
	module.exports = {
		db: {
			mongoURI: process.env.MONGODB_URI,
		},
	};
} else { // Development
	module.exports = {
		db: {
			mongoURI: db.devURI,
			PORT: 5000,
		},
	};
}
