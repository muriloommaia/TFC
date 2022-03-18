/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/return-await */
import Matches from '../database/models/Matches';
import { MatchesType } from '../domain';

export default class MatchesModel {
  async findAll(): Promise<MatchesType[]> {
    return await Matches.findAll() as unknown as MatchesType[];
  }
}
