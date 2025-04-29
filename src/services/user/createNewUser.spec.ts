import { beforeEach, describe, expect, it } from 'vitest';
import { CreateNewUser } from './createNewUser';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-usre-repository';
import { ErrorUserEmailExists } from '../../errors/error.user-email-exists';

let usersRepository: InMemoryUserRepository;
let sut: CreateNewUser;

describe('Service Create New User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new CreateNewUser(usersRepository);
  });

  it('should be able password_hash when create new user', async () => {
    const { user } = await sut.execute({
      name: 'Jonh Doe',
      email: 'doe@doe.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should NOT be able create new user with same email twice', async () => {
    const email = 'doe@doe.com';

    await sut.execute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'Jonh Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ErrorUserEmailExists);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jonh Doe',
      email: 'doe@doe.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
