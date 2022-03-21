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

  private teamsName: string[];

  constructor(readonly matches: MatchesTypeReturn[]) {
    this.teams = [];
    this.teamsName = [];
    this.leaderboard();
  }

  private insertOneClub(club: string) {
    this.teamsName.push(club);
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

  private insertDatas(name: string, goals: number[]) {
    const idxTeam = this.teamsName.indexOf(name);
    const draw = goals[0] - goals[1];
    if (draw === 0) this.funcDraw(idxTeam, goals);
  }

  private async calculateAllTeams(): Promise<void> {
    this.matches.forEach((match) => {
      const { homeClub: { clubName: homeClub },
        homeTeamGoals,
        awayClub: { clubName: awayClub },
        awayTeamGoals } = match;
      if (!this.teamsName.includes(homeClub)) {
        return this.insertOneClub(homeClub);
      }
      if (!this.teamsName.includes(awayClub)) {
        return this.insertOneClub(awayClub);
      }
    });
  }

  private async leaderboard(): Promise<void> {
    this.calculateAllTeams();
  }
}

// const calculateAllTeams = (matches: MatchesTypeReturn[]): ILeaderBoard[] => {
//   const teams: ILeaderBoard[] = [];
//   const teamsNames: string[] = [];
//   matches.forEach((match) => {
//     const { homeClub: { clubName: homeClub }, awayClub: { clubName: awayClub } } = match;
//     if (!teamsNames.includes(clubName)) {
//       teamsNames.push(homeTeam);
//       teams.push({
//         name: homeTeam,
//         totalPoints: 0,
//         totalVictories: 0,
//         totalDraws: 0,
//         totalLosses: 0,
//         goalsFavor: 0,
//         goalsOwn: 0,
//         goalsBalance: 0,
//         efficiency: 0,
//       });
//     }
//     if (!teamsNames.includes(awayTeam)) {
//       teamsNames.push(awayTeam);
//       teams.push({
//         name: awayTeam,
//         totalPoints: 0,
//         totalVictories: 0,
//         totalDraws: 0,
//         totalLosses: 0,
//         goalsFavor: 0,
//         goalsOwn: 0,
//         goalsBalance: 0,
//         efficiency: 0,
//       });
//     }
//   });
//   matches.forEach((match) => {
//     const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
//     const homeTeamIndex = teams.findIndex((team) => team.name === homeTeam);
//     const awayTeamIndex = teams.findIndex((team) => team.name === awayTeam);
//     if (homeTeamGoals > awayTeamGoals) {
//       teams[homeTeamIndex].totalPoints += 3;
//       teams[homeTeamIndex].totalVictories += 1;
//       teams[homeTeamIndex].goalsFavor += homeTeamGoals;
//       teams[homeTeamIndex].goalsOwn += awayTeamGoals;
//       teams[homeTeamIndex].goalsBalance += homeTeamGoals - awayTeamGoals;
//       teams[homeTeamIndex].efficiency = teams[homeTeamIndex].goalsBalance / teams[homeTeamIndex].goalsOwn;
//       teams[awayTeamIndex].totalLosses += 1;
//     } else if (homeTeamGoals < awayTeamGoals) {
//       teams[awayTeamIndex].
// };

// export const leaderBoard = (matches: MatchesType[]) => {
//   const classification = [];
// };

// "name": "Palmeiras",
// "totalPoints": 13,
// "totalGames": 5,
// "totalVictories": 4,
// "totalDraws": 1,
// "totalLosses": 0,
// "goalsFavor": 17,
// "goalsOwn": 5,
// "goalsBalance": 12,
// "efficiency": 86.67
