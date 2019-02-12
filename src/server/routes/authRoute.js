import express from 'express';
import controller from '../controllers/authController';

const router = express.Router();

router.route('/google')
	.get(controller.getAuth);

router.route('/google/callback')
	.get(controller.getAuthCallback, controller.getDashboard);

router.route('/logout')
	.get(controller.getLogout);

export default router;
