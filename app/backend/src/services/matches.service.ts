import { MatchesType } from '../domain';
import MatchesModel from '../models/matches.model';
import { StatusCode } from '../utils/utils';
import { ResponseService } from './interfaces';

export default class MatchesService {
  constructor(readonly model: MatchesModel) { }

  async findAll(): Promise<ResponseService<MatchesType[]>> {
    const response = await this.model.findAll();
    return {
      status: StatusCode.ok,
      message: response,
    };
  }
}
