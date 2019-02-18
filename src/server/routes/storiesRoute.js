import express from 'express';
import controller from '../controllers/storiesController';
import { ensureAuthenticated } from '../../helpers/auth';

const router = express.Router();

// Stories Index
router.route('/')
	.get(controller.getStories)
	.post(controller.postStory);

router.route('/:id')
	.put(ensureAuthenticated, controller.updateOne)
	.delete(ensureAuthenticated, controller.deleteOne);

// Add Story Form
router.route('/add')
	.get(ensureAuthenticated, controller.getAdd);

// Show Single Story based on id parameter
router.route('/show/:id')
	.get(controller.getStory);

// Get specific user's stories
router.route('/user/:userId')
	.get(controller.getUserStories);

// Show Single Story based on id parameter
router.route('/edit/:id')
	.get(ensureAuthenticated, controller.getEdit);

// Post a Comment
router.route('/comment/:id')
	.post(controller.postComment);

router.route('/my')
	.get(ensureAuthenticated, controller.getMyStories);

export default router;
