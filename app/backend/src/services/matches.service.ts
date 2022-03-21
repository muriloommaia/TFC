import { MatchesType } from '../domain';
import UnauthorizedError from '../erros/unauthorized.error';
import ClubsModel from '../models/clubs.model';
import MatchesModel from '../models/matches.model';
import { MessagesStatus, StatusCode } from '../utils/utils';
import { ResponseService } from './interfaces';

export default class MatchesService {
  constructor(readonly model: MatchesModel, readonly clubModel: ClubsModel = new ClubsModel()) { }

  async findAll(): Promise<ResponseService<MatchesType[]>> {
    const response = await this.model.findAll();
    return {
      status: StatusCode.ok,
      message: response,
    };
  }

  async findAllProgress(bool: boolean): Promise<ResponseService<MatchesType[]>> {
    const response = await this.model.findAllProgress(bool);
    return {
      status: StatusCode.ok,
      message: response,
    };
  }

  async createMatch(match: MatchesType): Promise<ResponseService<MatchesType>> {
    if (!match.inProgress) {
      throw new UnauthorizedError(MessagesStatus.inProgressTrue);
    }
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError(MessagesStatus.sameTeamMatch);
    }
    const promisesClubs = await Promise.all(
      [this.clubModel.findById(homeTeam), this.clubModel.findById(awayTeam)],
    );
    if (!promisesClubs[0] || !promisesClubs[1]) {
      throw new UnauthorizedError(MessagesStatus.teamNotFound);
    }
    const response = await this.model.createMatch(match);
    return {
      status: StatusCode.created,
      message: response,
    };
  }
}
