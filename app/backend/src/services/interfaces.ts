import { User } from '../domain';

export type ResponseLogin = {
  status: number,
  message: {
    user: Omit<User, 'password'>,
    token: string,
  }
};

export type NormalResponse = {
  status: number,
  message: string,
};
