import ClubsModel from '../models/clubs.model';
import { StatusCode } from '../utils/utils';
import { ClubsResponse } from './interfaces';

export default class ClubsService {
  constructor(readonly model: ClubsModel) { }

  async findAll(): Promise<ClubsResponse> {
    const response = await this.model.findAll();
    return {
      status: StatusCode.ok,
      message: response,
    };
  }
}
