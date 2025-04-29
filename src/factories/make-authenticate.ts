import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { AuthenticateService } from '../services/auth/authenticate';

export function makeAuthenticateUser() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUser = new AuthenticateService(usersRepository);

  return authenticateUser;
}
