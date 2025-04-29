import { PrismaCheckinRepository } from '../repositories/prisma/prisma-checkin-repository';
import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository';
import { CheckInService } from '../services/checkin/checkin';

export function makeCheckIn() {
  const checkinRepository = new PrismaCheckinRepository();
  const gymRepository = new PrismaGymRepository();
  const checkin = new CheckInService(checkinRepository, gymRepository);

  return checkin;
}
