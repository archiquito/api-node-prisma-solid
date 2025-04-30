import { prisma } from '../../lib/prisma';
import { CheckIn, Prisma } from '../../generated/prisma';
import { CheckInRepository } from '../checkin-repository';
import dayjs from 'dayjs';

export class PrismaCheckinRepository implements CheckInRepository {
  async save(data: CheckIn): Promise<CheckIn> {
    const checkin = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });
    return checkin;
  }
  async findHistoryCheckinsByUserId(userId: string, page: number) {
    const checkIns = prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return checkIns;
  }
  async countCheckinsByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
    return count;
  }
  async findById(checkinId: string) {
    const checkin = await prisma.checkIn.findUnique({
      where: {
        id: checkinId,
      },
    });
    return checkin;
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });
    return checkIn;
  }

  async findUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const userCheckIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return userCheckIn;
  }
}
