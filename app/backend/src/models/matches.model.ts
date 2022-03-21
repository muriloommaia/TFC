/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/return-await */
import Clubs from '../database/models/Clubs';
import Matches from '../database/models/Matches';
import { MatchesGoalT, MatchesType, MatchesTypeReturn } from '../domain';

export default class MatchesModel {
  async findAll(): Promise<MatchesTypeReturn[]> {
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
    }) as unknown as MatchesTypeReturn[];
  }

  // async findById(id: number): Promise<MatchesType> {
  //   return await Matches.findByPk(id) as unknown as MatchesType;
  // }

  async findAllProgress(bool: boolean): Promise<MatchesTypeReturn[]> {
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
    }) as unknown as MatchesTypeReturn[];
  }

  async createMatch(match: MatchesType): Promise<MatchesType> {
    return await Matches.create(match) as unknown as MatchesType;
  }

  async finishMatch(id: number): Promise<boolean> {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    ) as unknown as number;
    return true;
  }

  async updateMatch(id: number, match: Omit<MatchesGoalT, 'id'>): Promise<boolean> {
    await Matches.update(
      match,
      { where: { id } },
    );
    return true as unknown as boolean;
  }
}
