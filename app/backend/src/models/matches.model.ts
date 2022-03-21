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

  async findById(id: number): Promise<MatchesType> {
    return await Matches.findByPk(id) as unknown as MatchesType;
  }

  async findAllProgress(bool: boolean): Promise<MatchesType[]> {
    return await Matches.findAll({
      where: {
        inProgress: bool,
      },
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

  async createMatch(match: MatchesType): Promise<MatchesType> {
    return await Matches.create(match) as unknown as MatchesType;
  }

  async finishMatch(id: number): Promise<MatchesType> {
    return await Matches.update(
      { inProgress: false },
      { where: { id } },
    ) as unknown as MatchesType;
  }
}
