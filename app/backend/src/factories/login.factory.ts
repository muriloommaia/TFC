import LoginController from '../controller/login.controller';
import LoginModels from '../model/login.model';
import LoginServices from '../service/login.service';

const loginFactory = (): LoginController => {
  const loginModel = new LoginModels();
  const loginService = new LoginServices(loginModel);
  const loginController = new LoginController(loginService);
  return loginController;
};

export default loginFactory;
