import express from 'express';
import controller from '../controllers/storiesController';
import { ensureAuthenticated } from '../../helpers/auth';

const router = express.Router();

// Stories Index
router.route('/')
	.get(controller.getStories)
	.post(controller.postStory);

// Add Story Form
router.route('/add')
	.get(ensureAuthenticated, controller.getAdd);

// Show Single Story based on id parameter
router.route('/show/:id')
	.get(controller.getStory);

export default router;
