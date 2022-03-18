import { NextFunction, Request, Response } from 'express';
import ClubsService from '../services/clubs.service';

export default class ClubsController {
  constructor(readonly service: ClubsService) { }

  async findAll(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { status, message } = await this.service.findAll();
    res.status(status).json(message);
  }
}
