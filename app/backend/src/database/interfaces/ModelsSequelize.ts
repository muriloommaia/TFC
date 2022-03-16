export interface IModelSequelizeUsers {
  id?: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IModelSequelizeClubs {
  id?: number,
  clubName: string
}

export interface IModelSequelizeMatches {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}
