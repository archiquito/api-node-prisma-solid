import { hash } from 'bcryptjs';
import { UsersRepository } from '../../repositories/users-repository';
import { ErrorUserEmailExists } from '../../errors/error.user-email-exists';
import { User } from '../../generated/prisma';

interface CreateNewUserProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class CreateNewUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateNewUserProps): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new ErrorUserEmailExists();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
