import { describe, expect, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-usre-repository';
import { GetUserProfileService } from './getUserProfile';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileService;

describe('Service Get User Profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('John Doe');
  });

  it('should NOT be able to authenticate with worng id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existng-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
