import express from 'express';
import controller from '../controllers/storiesController';

const router = express.Router();

router.route('/')
	.get(controller.getIndex);

router.route('/add')
	.get(controller.getAdd);

export default router;
