import { NextFunction, Request, Response } from 'express';
import { MessagesStatus, StatusCode } from '../utils/utils';

const errorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(StatusCode.unauthorized).json({ message });
      break;
    case 'BadRequestError':
      res.status(StatusCode.badRequest).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(StatusCode.unauthorized).json({ message });
      break;
    default:
      res.status(StatusCode.internalServerError).json({
        message: MessagesStatus.internalServerError,
      });
      break;
  }
  next();
};

export default errorMiddleware;
