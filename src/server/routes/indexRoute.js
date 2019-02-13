import express from 'express';
import controller from '../controllers/indexController';

const router = express.Router();

router.route('/')
	.get(controller.getIndex);

export default router;
