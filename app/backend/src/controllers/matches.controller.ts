import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.service';
// import { verifyCreateMatch } from '../utils/JOI/validationJOI';

export default class MatchesController {
  constructor(readonly service: MatchesService) { }

  async findAll(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { inProgress } = req.query;
    if (!['true', 'false'].includes(`${inProgress}`)) {
      const { status, message } = await this.service.findAll();
      res.status(status).json(message);
    } else {
      const progress = inProgress === 'true';
      const { status, message } = await this.service.findAllProgress(progress);
      res.status(status).json(message);
    }
  }

  async createMatch(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const body = {
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      inProgress: req.body.inProgress,
      homeTeamGoals: req.body.homeTeamGoals,
      awayTeamGoals: req.body.awayTeamGoals,
    };
    // const validate = await verifyCreateMatch(body);
    const { status, message } = await this.service.createMatch(body);
    res.status(status).json(message);
  }

  async finishMatch(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { status } = await this.service.finishMatch(+id);
    res.status(status).json({ message: 'Match finished' });
  }

  async updateMatch(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, message } = await this.service.updateMatch(
      +id,
      { homeTeamGoals, awayTeamGoals },
    );
    res.status(status).json(message);
  }

  async leaderBoard(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { status, message } = await this.service.allLeaderBoard();
    res.status(status).json(message);
  }
}
