import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import { verifyCreateMatch } from '../utils/JOI/validationJOI';

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
    const { body } = req;
    const validate = await verifyCreateMatch(body);
    const { status, message } = await this.service.createMatch(validate);
    res.status(status).json(message);
  }
}
