import { LoginUser } from '../domain';
import UnauthorizedError from '../erros/unauthorized.error';
import LoginModels from '../models/login.model';
import { decryptPass } from '../utils/bcrypt';
import { generateToken } from '../utils/JWT/jwtToken';
import { MessagesStatus, StatusCode } from '../utils/utils';
import { ResponseLogin } from './interfaces';

export default class LoginServices {
  constructor(readonly model: LoginModels) { }

  async loginUser(body: LoginUser): Promise<ResponseLogin> {
    const { email, password: pass } = body;
    const findEmail = await this.model.findEmail(email);
    if (!findEmail) {
      throw new UnauthorizedError(MessagesStatus.incorrectEmail);
    }
    const { password: hash, ...user } = findEmail;
    const truePass = await decryptPass(pass, hash);
    if (!truePass) {
      throw new UnauthorizedError(MessagesStatus.incorrectPassword);
    }
    const token = await generateToken(user);
    return {
      message: {
        user,
        token,
      },
      status: StatusCode.ok,
    };
  }
}
