import { PrismaCheckinRepository } from '../repositories/prisma/prisma-checkin-repository';
import { GetUserMetricsService } from '../services/user/getUserMetrics';

export function makeCheckIn() {
  const checkinRepository = new PrismaCheckinRepository();
  const userMetrics = new GetUserMetricsService(checkinRepository);

  return userMetrics;
}
