/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/return-await */
import Clubs from '../database/models/Clubs';
import Matches from '../database/models/Matches';
import { MatchesType } from '../domain';

export default class MatchesModel {
  async findAll(): Promise<MatchesType[]> {
    return await Matches.findAll({
      include: [
        {
          model: Clubs,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        {
          model: Clubs,
          as: 'awayClub',
          attributes: ['clubName'],
        },
      ],
    }) as unknown as MatchesType[];
  }
}
