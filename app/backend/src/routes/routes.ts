import { Router } from 'express';
import loginFactory from '../factories/login.factory';

const loginController = loginFactory();
// loginController.test();

const router = Router();
router.post('/login', (req, res, next) => {
  loginController.startLogin(req, res, next);
});

export default router;
