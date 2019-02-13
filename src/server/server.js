import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import appMiddleware from './middleware/appMiddleware';
import { index, about, auth } from './routes/routes';

const { db } = require('../config/database');

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
app.use('/about', about);
app.use('/auth', auth);

export default app;
