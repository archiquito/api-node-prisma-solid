import { beforeEach, describe, expect, it } from 'vitest';
import { CreateNewGym } from './createNewGym';
import { InMemoryGymRepository } from '../../repositories/in-memory/in-memory-gym-repository';
import { Decimal } from '../../generated/prisma/runtime/library';

let gymsRepository: InMemoryGymRepository;
let sut: CreateNewGym;

describe('Service Create New User', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new CreateNewGym(gymsRepository);
  });

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'New gym',
      description: 'gym to dev code',
      phone: '98123456',
      latitude: new Decimal(-23.5337923),
      longitude: new Decimal(-47.579136),
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
