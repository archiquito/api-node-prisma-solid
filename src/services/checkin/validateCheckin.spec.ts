import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckinRepository } from '../../repositories/in-memory/in-memory-checkin-repository';
import { ValidateCheckInService } from './validateCheckin';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { LateCheckInValidationError } from '../../errors/late-checkin-validation-error';

let checkInRepository: InMemoryCheckinRepository;
let sut: ValidateCheckInService;

describe('Service Validate CheckIns', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckinRepository();
    sut = new ValidateCheckInService(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useFakeTimers();
  });

  it('should be able to user validate check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    });

    const { checkIn } = await sut.execute({
      checkinId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInRepository.itens[0].validated_at).toEqual(expect.any(Date));
  });

  it('should NOT be able to user validate inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkinId: 'inexist-checkin-is',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should NOT be able to validate check-in after 20min. of the creation', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));
    const createdCheckIn = await checkInRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    });

    const minute21InMls = 1000 * 60 * 21;
    vi.advanceTimersByTime(minute21InMls);

    await expect(() =>
      sut.execute({
        checkinId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
