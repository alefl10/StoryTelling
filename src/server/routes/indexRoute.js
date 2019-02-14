import express from 'express';
import controller from '../controllers/indexController';

const router = express.Router();

router.route('/')
	.get(controller.getIndex);

router.route('/dashboard')
	.get(controller.getDashboard);

router.route('/about')
	.get(controller.getAbout);

export default router;
