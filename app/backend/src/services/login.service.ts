import { LoginUser } from '../domain';
import BadRequestError from '../erros/bad.request.error';
import LoginModels from '../models/login.model';
import { StatusCode } from '../utils/utils';

export default class LoginServices {
  constructor(readonly model: LoginModels) { }

  async loginUser(body: LoginUser): Promise<any> {
    const { email, password } = body;
    const findEmail = await this.model.findEmail(email);
    if (!findEmail) {
      throw new BadRequestError('Email não encontrado');
    }
    return {
      message: findEmail,
      status: StatusCode.ok,
    };
  }
}
