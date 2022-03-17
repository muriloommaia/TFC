import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../erros/bad.request.error';
import { verifyToken } from '../utils/JWT/jwtToken';
import { StatusCode } from '../utils/utils';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization: token } = req.headers;
  if (!token) throw new BadRequestError('Token not found');
  await verifyToken(token);
  next();
};

export const returnRoleToken = async (
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> => {
  const { authorization: token } = req.headers;
  const verify = await verifyToken(token as string);
  res.status(StatusCode.ok).send(verify.role);
};
