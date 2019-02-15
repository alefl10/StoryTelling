import express from 'express';
import controller from '../controllers/storiesController';
import { ensureAuthenticated } from '../../helpers/auth';

const router = express.Router();

// Stories Index
router.route('/')
	.get(controller.getIndex)
	.post(controller.postStory);

// Add Story Form
router.route('/add')
	.get(ensureAuthenticated, controller.getAdd);


router.route('/show')
	.get(controller.getShow);

export default router;
