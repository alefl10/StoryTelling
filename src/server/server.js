import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import appMiddleware from './middleware/appMiddleware';
import { auth } from './routes/routes';


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
	res.send('Hello world!');
});

// About route
app.get('/about', (req, res) => {
	res.render('about');
});

// Use routes
app.use('/auth', auth);

export default app;
