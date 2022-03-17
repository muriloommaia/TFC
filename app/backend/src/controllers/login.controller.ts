import { NextFunction, Request, Response } from 'express';
import LoginServices from '../services/login.service';
import { verifyLogin } from '../utils/JOI/validationJOI';

export default class LoginController {
  constructor(readonly service: LoginServices) { }

  async startLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validate = await verifyLogin(req.body);
      const findEmail = await this.service.loginUser(validate);
      res.status(findEmail.status).json({
        message: findEmail.message,
      });
    } catch (error) {
      next(error);
    }
  }

  test(_req: Request, _res: Response, _next: NextFunction) {
    console.log(this);
    console.log('teste');
  }
}
