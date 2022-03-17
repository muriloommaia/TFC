import { NextFunction, Request, Response } from 'express';
import LoginServices from '../services/login.service';
import { verifyLogin } from '../utils/JOI/validationJOI';

export default class LoginController {
  constructor(readonly service: LoginServices) { }

  async startLogin(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const validate = await verifyLogin(req.body);
    const { status, message } = await this.service.loginUser(validate);
    res.status(status).json(message);
  }

  test(_req: Request, _res: Response, _next: NextFunction) {
    console.log(this);
    console.log('teste');
  }
}
