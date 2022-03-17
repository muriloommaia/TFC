import { Router } from 'express';
import loginFactory from '../factories/login.factory';

const loginController = loginFactory();
// loginController.test();

const router = Router();
router.post('/login', async (req, res, next) => {
  await loginController.startLogin(req, res, next);
});

export default router;
