import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import appMiddleware from './middleware/appMiddleware';

const { db } = require('../config/database');

const app = express();

appMiddleware(app);

// Static Folder
app.use(express.static(path.join(__dirname, '../..', 'public')));

// Connect to mongoose
mongoose.connect(db.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// Index Route
app.get('/', (req, res) => {
	const title = 'Welcome!';
	res.render('index', {
		title,
	});
});

// About route
app.get('/about', (req, res) => {
	res.render('about');
});

// // Use routes

export default app;
