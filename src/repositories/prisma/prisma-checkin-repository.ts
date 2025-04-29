import { prisma } from '../../lib/prisma';
import { Prisma } from '../../generated/prisma';
import { CheckInRepository } from '../checkin-repository';

export class PrismaCheckinRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });
    return checkIn;
  }

  async findUserIdOnDate(userId: string, date: Date) {
    const userCheckIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: date,
      },
    });
    return userCheckIn;
  }
}
