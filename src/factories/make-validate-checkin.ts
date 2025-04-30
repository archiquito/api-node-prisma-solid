import { PrismaCheckinRepository } from '../repositories/prisma/prisma-checkin-repository';
import { ValidateCheckInService } from '../services/checkin/validateCheckin';

export function makeValidateCheckIn() {
  const checkinRepository = new PrismaCheckinRepository();
  const checkin = new ValidateCheckInService(checkinRepository);

  return checkin;
}
