import { Prisma, User } from '../../generated/prisma';
import { UsersRepository } from '../users-repository';

export class InMemoryUserRepository implements UsersRepository {
  public itens: User[] = [];

  async findById(id: string) {
    const user = this.itens.find((e) => e.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.itens.find((e) => e.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.itens.push(user);
    return user;
  }
}
