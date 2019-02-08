import express from 'express';
import controller from '../controllers/authController';

const router = express.Router();

router.route('/google')
	.get(controller.getAuth);


export default router;
