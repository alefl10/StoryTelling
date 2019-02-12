import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
	googleID: {
		type: String,
		unique: true,
		required: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	image: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('users', UserSchema);
