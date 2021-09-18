import { AuthChecker } from 'type-graphql';
import { AppContext } from '../types';

export const authChecker: AuthChecker<AppContext> = async({ context }) => {

  return true;

  try {
    await context.request.jwtVerify();
    return true;
  } catch {
    return false;
  }
};
