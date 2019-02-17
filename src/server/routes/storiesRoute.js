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
	.get(ensureAuthenticated, controller.getStory);

// Show Single Story based on id parameter
router.route('/edit/:id')
	.get(ensureAuthenticated, controller.getEdit);

export default router;
