import LoginController from '../controllers/login.controller';
import LoginModels from '../models/login.model';
import LoginServices from '../services/login.service';

const loginFactory = (): LoginController => {
  const loginModel = new LoginModels();
  const loginService = new LoginServices(loginModel);
  const loginController = new LoginController(loginService);
  return loginController;
};

export default loginFactory;
