/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/return-await */
import Clubs from '../database/models/Clubs';
import { ClubsType } from '../domain';

export default class ClubsModel {
  async findAll(): Promise<ClubsType[]> {
    return await Clubs.findAll() as unknown as ClubsType[];
  }
}
