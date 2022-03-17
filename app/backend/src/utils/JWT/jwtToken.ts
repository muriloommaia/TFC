import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import { User } from '../../domain';

const readAsync = async () => {
  const secret = await fs.readFile('./jwt.evaluation.key', 'utf8');
  return secret;
};

export const generateToken = async (user: Omit<User, 'password'>) => {
  const secret = await readAsync();
  const token = jwt.sign(user, secret, {
    expiresIn: '1d',
  });
  return token;
};

export const verifyToken = async (token: string): Promise<Omit<User, 'password'>> => {
  const secret = await readAsync();
  const tokenGenerate = jwt.verify(token, secret) as Omit<User, 'password'>;
  return tokenGenerate;
};
