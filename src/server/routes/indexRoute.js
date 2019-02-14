import express from 'express';
import controller from '../controllers/indexController';
import { ensureAuthenticated, ensureGuest } from '../../helpers/auth';

const router = express.Router();

router.route('/')
	.get(ensureGuest, controller.getIndex);

router.route('/dashboard')
	.get(ensureAuthenticated, controller.getDashboard);

router.route('/about')
	.get(controller.getAbout);

export default router;
