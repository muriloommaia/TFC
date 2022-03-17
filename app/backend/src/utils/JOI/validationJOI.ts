import { LoginUser } from '../../domain';
import { schemaLogin } from './schemas';

export const WITHOUT_DEFAULT = 1;

export const verifyLogin = async (body: LoginUser): Promise<LoginUser> => {
  const validate = await schemaLogin.validateAsync(body);
  return validate;
};
