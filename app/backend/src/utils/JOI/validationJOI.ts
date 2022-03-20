import { LoginUser, MatchesType } from '../../domain';
import { schemaCreateMatch, schemaLogin } from './schemas';

export const WITHOUT_DEFAULT = 1;

export const verifyLogin = async (body: LoginUser): Promise<LoginUser> => {
  const validate = await schemaLogin.validateAsync(body);
  return validate;
};

export const verifyCreateMatch = async (body: MatchesType): Promise<MatchesType> => {
  const validate = await schemaCreateMatch.validateAsync(body);
  return validate;
};
