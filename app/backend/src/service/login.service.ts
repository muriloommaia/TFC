import BadRequestError from '../erros/bad.request.error';
import LoginModels from '../model/login.model';
import { StatusCode } from '../utils/utils';

export default class LoginServices {
  constructor(readonly model: LoginModels) { }

  async findEmail(email: string): Promise<any> {
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
