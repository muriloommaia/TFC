import { Router } from 'express';
import loginFactory from '../factories/login.factory';

const loginController = loginFactory();

const router = Router();
router.get('/', loginController.startLogin);

export default router;
