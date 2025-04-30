import { beforeEach, describe, expect, it } from 'vitest';
import { CreateNewGymService } from './createNewGym';
import { InMemoryGymRepository } from '../../repositories/in-memory/in-memory-gym-repository';

let gymsRepository: InMemoryGymRepository;
let sut: CreateNewGymService;

describe('Service Create New User', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new CreateNewGymService(gymsRepository);
  });

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'New gym',
      description: 'gym to dev code',
      phone: '98123456',
      latitude: -23.5337923,
      longitude: -47.579136,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
