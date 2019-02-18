module.exports = {
	db: {
		mongoURI: process.env.MONGO_URI,
	},
	google: {
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
	},
	passportSecret: process.env.PASSPORT_SECRET,
};
