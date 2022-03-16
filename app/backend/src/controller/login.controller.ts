import { NextFunction, Request, Response } from 'express';
import LoginServices from '../service/login.service';

export default class LoginController {
  constructor(readonly service: LoginServices) { }

  async startLogin(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email } = req.body;
    try {
      console.log('this', this);
      console.log('email', email);
      // const findEmail = await this.Service.findEmail(email);
      // res.status(findEmail.status).json({
      //   message: findEmail.message,
      // });
    } catch (error) {
      next(error);
    }
  }

  test(_req: Request, _res: Response, _next: NextFunction) {
    console.log(this);
    console.log('teste');
  }
}
