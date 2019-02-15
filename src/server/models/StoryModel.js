import mongoose from 'mongoose';

const { Schema } = mongoose;

const StorySchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: 'public',
	},
	allowComments: {
		type: Boolean,
		required: true,
	},
	comments: [{
		commentBody: {
			type: String,
			required: true,
		},
		commentDate: {
			type: Date,
			default: Date.now,
		},
		commentUser: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
	}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('stories', StorySchema, 'stories'); // Third parameter forces mongoDB to name de collection 'stories' instead of 'storys'
