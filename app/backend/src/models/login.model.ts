/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/return-await */
import Users from '../database/models/Users';
import { User } from '../domain';

export default class LoginModels {
  // private UserModel: Users;
  // constructor() {
  //   this.UserModel = Users
  // }

  async findEmail(email: string): Promise<User > {
    return await Users.findOne({
      where: { email },
      raw: true,
    }) as unknown as User;
  }
}
