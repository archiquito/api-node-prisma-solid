import { PrismaCheckinRepository } from '../repositories/prisma/prisma-checkin-repository';
import { FetchCheckInHistoryService } from '../services/checkin/fetchUserCheckinHystory';

export function makeFetchUserCheckInHistory() {
  const checkinRepository = new PrismaCheckinRepository();
  const checkin = new FetchCheckInHistoryService(checkinRepository);

  return checkin;
}
