import { Request, Response, Router } from 'express';
import Clubs from '../database/models/Clubs';

const router = Router();
router.route('/allClubs')
  .get(async (req: Request, res: Response) => {
    const allTeams = await Clubs.findAll();
    res.status(200).json(allTeams);
  });

export default router;
