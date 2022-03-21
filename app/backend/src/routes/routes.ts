import { Router } from 'express';
import clubsFactory from '../factories/clubs.factory';
import loginFactory from '../factories/login.factory';
import matchesFactory from '../factories/matches.factory';
import { authenticateToken, returnRoleToken } from '../middlewares/auth';

const loginController = loginFactory();
const clubsController = clubsFactory();
const matchesController = matchesFactory();

const router = Router();

router.get('/login/validate', authenticateToken, async (req, res, next) => {
  await returnRoleToken(req, res, next);
});
router.post('/login', async (req, res, next) => {
  await loginController.startLogin(req, res, next);
});

// router.use(authenticateToken);

router.get('/clubs', async (req, res, next) => {
  await clubsController.findAll(req, res, next);
});

router.get('/clubs/:id', async (req, res, next) => {
  await clubsController.findById(req, res, next);
});

router.get('/matchs', async (req, res, next) => {
  await matchesController.findAll(req, res, next);
});

router.post('/matchs', authenticateToken, async (req, res, next) => {
  await matchesController.createMatch(req, res, next);
});
export default router;
