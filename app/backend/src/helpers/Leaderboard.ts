/* eslint-disable class-methods-use-this */
import { MatchesTypeReturn } from '../domain';

export type ILeaderBoard = {
  name: string,
  totalPoints: number,
  totalVictories: number,
  totalGames: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

export class LeaderBoard {
  private teams: ILeaderBoard[];

  private _leaderboard: ILeaderBoard[] = [];

  private teamsName: string[];

  constructor(private matches: MatchesTypeReturn[]) {
    this.teams = [];
    this.teamsName = [];
    this.leaderboardCalc();
  }

  get leaderboard() {
    return this._leaderboard;
  }

  get allTeams() {
    return this.teams;
  }

  private insertOneClub(club: string) {
    this.teamsName.push(club);
    console.log(club);
    this.teams.push({
      name: club,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 100,
    });
  }

  private efficiency(team: ILeaderBoard) {
    return ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
  }

  private funcDraw(idx: number, goals: number[]) {
    this.teams[idx].goalsOwn += goals[0];
    this.teams[idx].goalsFavor += goals[1];
    this.teams[idx].goalsBalance += goals[0] - goals[1];
    this.teams[idx].totalPoints += 1;
    this.teams[idx].totalGames += 1;
    this.teams[idx].totalDraws += 1;
    this.teams[idx].efficiency = +this.efficiency(this.teams[idx]);
  }

  private vicOrLose(idx: number, goals: number[], result: number) {
    const win = result > 0 ? 1 : 0;
    this.teams[idx].goalsOwn += goals[0];
    this.teams[idx].goalsFavor += goals[1];
    this.teams[idx].goalsBalance += result;
    this.teams[idx].totalPoints += win ? 3 : 0;
    this.teams[idx].totalGames += 1;
    this.teams[idx].totalVictories += win;
    this.teams[idx].totalLosses += win === 1 ? 0 : 1;
    this.teams[idx].efficiency = +this.efficiency(this.teams[idx]);
  }

  private insertDatas(name: string, goals: number[]) {
    const idxTeam = this.teamsName.indexOf(name);
    const finalResult = goals[0] - goals[1];
    if (finalResult === 0) this.funcDraw(idxTeam, goals);
    else {
      this.vicOrLose(idxTeam, goals, finalResult);
    }
  }

  private async calculateAllTeams(): Promise<void> {
    this.matches.forEach((match) => {
      const { homeClub: { clubName: homeClub },
        homeTeamGoals,
        awayClub: { clubName: awayClub },
        awayTeamGoals } = match;
      if (!this.teamsName.includes(homeClub)) {
        this.insertOneClub(homeClub);
      }
      this.insertDatas(homeClub, [homeTeamGoals, awayTeamGoals]);
      if (!this.teamsName.includes(awayClub)) {
        this.insertOneClub(awayClub);
      }
      this.insertDatas(awayClub, [awayTeamGoals, homeTeamGoals]);
    });
  }

  private returnResultSort(bool: boolean) {
    return bool ? 1 : -1;
  }

  private makeBoard() {
    this._leaderboard = this.teams.sort((club1, club2) => {
      if (club1.totalPoints < club2.totalPoints) return 1;
      if (club1.totalPoints > club2.totalPoints) return -1;
      if (club1.totalVictories < club2.totalVictories) return 1;
      if (club1.totalVictories > club2.totalVictories) return -1;
      if (club1.goalsBalance < club2.goalsBalance) return 1;
      if (club1.goalsBalance > club2.goalsBalance) return -1;
      if (club1.goalsFavor < club2.goalsFavor) return 1;
      if (club1.goalsFavor > club2.goalsFavor) return -1;
      if (club1.goalsOwn < club2.goalsOwn) return 1;
      if (club1.goalsOwn > club2.goalsOwn) return -1;
      return 0;
    });
  }

  private async leaderboardCalc(): Promise<void> {
    this.calculateAllTeams();
    this.makeBoard();
  }
}

// const matchesProgressTrue = [
//   {
//     id: 41,
//     homeTeam: 16,
//     homeTeamGoals: 2,
//     awayTeam: 9,
//     awayTeamGoals: 0,
//     inProgress: true,
//     homeClub: {
//       clubName: 'São Paulo',
//     },
//     awayClub: {
//       clubName: 'Internacional',
//     },
//   },
//   {
//     id: 42,
//     homeTeam: 6,
//     homeTeamGoals: 1,
//     awayTeam: 1,
//     awayTeamGoals: 0,
//     inProgress: true,
//     homeClub: {
//       clubName: 'Ferroviária',
//     },
//     awayClub: {
//       clubName: 'Avaí/Kindermann',
//     },
//   },
//   {
//     id: 43,
//     homeTeam: 11,
//     homeTeamGoals: 0,
//     awayTeam: 10,
//     awayTeamGoals: 5,
//     inProgress: true,
//     homeClub: {
//       clubName: 'Napoli-SC',
//     },
//     awayClub: {
//       clubName: 'Flamengo',
//     },
//   },
//   {
//     id: 44,
//     homeTeam: 7,
//     homeTeamGoals: 2,
//     awayTeam: 15,
//     awayTeamGoals: 2,
//     inProgress: true,
//     homeClub: {
//       clubName: 'Flamengo',
//     },
//     awayClub: {
//       clubName: 'São José-SP',
//     },
//   },
// ];

// const matches = new LeaderBoard(matchesProgressTrue);

// console.log(matches.leaderboard);
