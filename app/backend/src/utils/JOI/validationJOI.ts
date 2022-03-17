import { LoginUser } from '../../domain';
import { schemaLogin } from './schemas';

export const WITHOUT_DEFAULT = 1;

export const verifyLogin = async (body: LoginUser): Promise<LoginUser> => {
  try {
    const validate = await schemaLogin.validateAsync(body);
    return validate;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
