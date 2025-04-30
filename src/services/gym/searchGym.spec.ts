import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryGymRepository } from '../../repositories/in-memory/in-memory-gym-repository';
import { SearchGymService } from './searchGym';

let gymsRepository: InMemoryGymRepository;
let sut: SearchGymService;

describe('Service Search Gyms', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new SearchGymService(gymsRepository);
  });

  it('should be able to search Gyms', async () => {
    await gymsRepository.create({
      title: 'New gym',
      description: 'gym to dev code',
      phone: '98123456',
      latitude: -23.5337923,
      longitude: -47.579136,
    });

    await gymsRepository.create({
      title: 'Javascript gym',
      description: 'gym to dev code',
      phone: '98123456',
      latitude: -23.5337923,
      longitude: -47.579136,
    });

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript gym' }),
    ]);
  });

  it('should be able to search Gym paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `New gym ${i}`,
        description: 'gym to dev code',
        phone: '98123456',
        latitude: -23.5337923,
        longitude: -47.579136,
      });
    }

    const { gyms } = await sut.execute({
      query: 'New gym',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'New gym 21' }),
      expect.objectContaining({ title: 'New gym 22' }),
    ]);
  });
});
