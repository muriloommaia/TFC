import { User } from '../domain';

type Indexable = {
  status: number;
};

export type ResponseLogin = Indexable & {
  message: {
    user: Omit<User, 'password'>,
    token: string,
  }
};

export type NormalResponse = Indexable & {
  message: string,
};

export type ResponseService<T> = Indexable & {
  message: T,
};

export type ValidateMatchCreate = {
  homeTeam: number;
  homeGoals: number;
  awayTeam: number;
  awayGoals: number;
  inProgress: boolean;
};
