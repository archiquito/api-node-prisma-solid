import { PrismaCheckinRepository } from '../repositories/prisma/prisma-checkin-repository';
import { GetUserMetricsService } from '../services/checkin/getUserMetrics';

export function makeCheckInUserMetrics() {
  const checkinRepository = new PrismaCheckinRepository();
  const userMetrics = new GetUserMetricsService(checkinRepository);

  return userMetrics;
}
