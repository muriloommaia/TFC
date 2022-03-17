import { Router } from 'express';
import loginFactory from '../factories/login.factory';
import { authenticateToken, returnRoleToken } from '../middlewares/auth';

const loginController = loginFactory();

const router = Router();

router.get('/login/validate', authenticateToken, async (req, res, next) => {
  await returnRoleToken(req, res, next);
});
router.post('/login', async (req, res, next) => {
  await loginController.startLogin(req, res, next);
});

export default router;
