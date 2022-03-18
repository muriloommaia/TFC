import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(readonly service: MatchesService) { }

  async findAll(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { status, message } = await this.service.findAll();
    res.status(status).json(message);
  }
}