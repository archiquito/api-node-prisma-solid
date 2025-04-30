import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryGymRepository } from '../../repositories/in-memory/in-memory-gym-repository';
import { FetchGymNearByService } from './fetchGymsNearBy';

let gymsRepository: InMemoryGymRepository;
let sut: FetchGymNearByService;

describe('Service Gyms Fetch Gym NearBy', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new FetchGymNearByService(gymsRepository);
  });

  it('should be able to fetch Nearby Gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: 'gym to dev code',
      phone: '98123456',
      latitude: -23.5337923,
      longitude: -47.579136,
    });

    await gymsRepository.create({
      title: 'Far gym',
      description: 'gym to dev code',
      phone: '98123456',
      latitude: -23.4045811,
      longitude: -47.2599396,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.5337923,
      userLongitude: -47.579136,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })]);
  });
});
