import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryCheckinRepository } from '../../repositories/in-memory/in-memory-checkin-repository';
import { GetUserMetricsService } from './getUserMetrics';

let checkInsRepository: InMemoryCheckinRepository;
let sut: GetUserMetricsService;

describe('Service User CheckIns Metrics', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it('should be able to count user check-ins from Metrics', async () => {
    await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01',
    });

    const { countCheckins } = await sut.execute({
      userId: 'user-01',
    });

    expect(countCheckins).toEqual(2);
  });
});
