import { NextFunction, Request, Response } from 'express';
import { MessagesStatus, StatusCode } from '../utils/utils';

const errorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message } = err;
  console.log(name, message);
  switch (name) {
    case 'ValidationError': return res.status(StatusCode.unauthorized).json({ message });
    case 'JsonWebTokenError': return res.status(StatusCode.badRequest).json({ message });
    case 'BadRequestError': return res.status(StatusCode.badRequest).json({ message });
    case 'UnauthorizedError': return res.status(StatusCode.unauthorized).json({ message });
    default:
      res.status(StatusCode.internalServerError).json({
        message: MessagesStatus.internalServerError,
      });
      break;
  }
  next();
};

export default errorMiddleware;
