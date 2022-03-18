/* eslint-disable @typescript-eslint/comma-dangle */
import {
  IModelSequelizeClubs,
  IModelSequelizeMatches
} from './database/interfaces/ModelsSequelize';

export type Indexable = {
  id: number
};

export type Entity = Indexable & {
  createdAt?: Date
  updatedAt?: Date
};

export type User = Entity & {
  email: string
  password: string
  role: string,
  username: string,
};

export type LoginUser = Omit<User, keyof Entity>;

export type ClubsType = IModelSequelizeClubs;

export type MatchesType = IModelSequelizeMatches;
