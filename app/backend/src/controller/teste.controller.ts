import LoginServices from '../service/login.service';

export default class ControllerLogin {
  constructor(readonly service: LoginServices) { }

  test() {
    console.log('teste', this);
  }
}
