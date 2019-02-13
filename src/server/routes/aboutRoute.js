import express from 'express';
import controller from '../controllers/aboutController';

const router = express.Router();

router.route('/')
	.get(controller.getAbout);

export default router;
