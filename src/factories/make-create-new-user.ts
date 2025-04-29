import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { CreateNewUser } from '../services/user/createNewUser';

export function makeCreateNewUser() {
  const usersRepository = new PrismaUsersRepository();
  const createNewUser = new CreateNewUser(usersRepository);

  return createNewUser;
}
