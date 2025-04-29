import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckinRepository } from '../../repositories/in-memory/in-memory-checkin-repository';
import { CheckInService } from './checkin';
import { CheckInError } from '../../errors/checkin-error';
import { InMemoryGymRepository } from '../../repositories/in-memory/in-memory-gym-repository';
import { Decimal } from '../../generated/prisma/runtime/library';
import { MaxDistanceError } from '../../errors/max-distance-error';

let checkInsRepository: InMemoryCheckinRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInService;

describe('Service User CheckIns', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinRepository();
    gymRepository = new InMemoryGymRepository();
    sut = new CheckInService(checkInsRepository, gymRepository);

    await gymRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5337923),
      longitude: new Decimal(-47.579136),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useFakeTimers();
  });

  it('should be able to user check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5337923,
      userLongitude: -47.579136,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should NOT be able to user checkin twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5337923,
      userLongitude: -47.579136,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5337923,
        userLongitude: -47.579136,
      }),
    ).rejects.toBeInstanceOf(CheckInError);
  });

  it('should be able to user checkin twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5337923,
      userLongitude: -47.579136,
    });

    vi.setSystemTime(new Date(2025, 0, 5, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5337923,
      userLongitude: -47.579136,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should NOT be able to user check in on distant gym', async () => {
    gymRepository.itens.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5097892),
      longitude: new Decimal(-47.5311996),
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5337923,
        userLongitude: -47.579136,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
