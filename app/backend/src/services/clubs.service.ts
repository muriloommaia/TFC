import { ClubsType } from '../domain';
import BadRequestError from '../erros/bad.request.error';
import ClubsModel from '../models/clubs.model';
import { StatusCode } from '../utils/utils';
import { ResponseService } from './interfaces';

export default class ClubsService {
  constructor(readonly model: ClubsModel) { }

  async findAll(): Promise<ResponseService<ClubsType[]>> {
    const response = await this.model.findAll();
    return {
      status: StatusCode.ok,
      message: response,
    };
  }

  async findById(id: number): Promise<ResponseService<ClubsType>> {
    const response = await this.model.findById(id);
    if (!response) throw new BadRequestError('Club not found');
    return {
      status: StatusCode.ok,
      message: response,
    };
  }
}
