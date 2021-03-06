import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import appMiddleware from './middleware/appMiddleware';
import { index, stories, auth } from './routes/routes';

const { db } = require('../config/keys');

// Connect to mongoose
mongoose.connect(db.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

const app = express();

appMiddleware(app);

// Static Folder
app.use(express.static(path.join(__dirname, '../..', 'public')));

// Use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);


export default app;
