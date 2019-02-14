import express from 'express';
import controller from '../controllers/storiesController';
import { ensureAuthenticated } from '../../helpers/auth';

const router = express.Router();

// Stories Index
router.route('/')
	.get(controller.getIndex);

// Add Story Form
router.route('/add')
	.get(ensureAuthenticated, controller.getAdd);

export default router;
