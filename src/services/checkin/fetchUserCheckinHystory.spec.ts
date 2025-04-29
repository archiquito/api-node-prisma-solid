import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryCheckinRepository } from '../../repositories/in-memory/in-memory-checkin-repository';
import { FetchCheckInHistory } from './fetchUserCheckinHystory';

let checkInsRepository: InMemoryCheckinRepository;
let sut: FetchCheckInHistory;

describe('Service User CheckIns History', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinRepository();
    sut = new FetchCheckInHistory(checkInsRepository);
  });

  it('should be able to user check in history', async () => {
    await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01',
    });

    const { historyCheckins } = await sut.execute({
      userId: 'user-01',
      page: 1,
    });

    expect(historyCheckins).toHaveLength(2);
    expect(historyCheckins).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ]);
  });

  it('should be able to user check in history paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gymId: `gym-${i}`,
        user_id: 'user-01',
      });
    }

    const { historyCheckins } = await sut.execute({
      userId: 'user-01',
      page: 2,
    });

    expect(historyCheckins).toHaveLength(2);
    expect(historyCheckins).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ]);
  });
});
