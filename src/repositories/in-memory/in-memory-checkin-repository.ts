import { randomUUID } from 'node:crypto';
import { CheckIn, Prisma } from '../../generated/prisma';
import { CheckInRepository } from '../checkin-repository';
import dayjs from 'dayjs';

export class InMemoryCheckinRepository implements CheckInRepository {
  public itens: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      user_id: data.user_id,
      gymId: data.gymId,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.itens.push(checkin);
    return checkin;
  }

  async findUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const userCheckinOnSameDate = this.itens.find((item) => {
      const checkInDate = dayjs(item.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return item.user_id === userId && isOnSameDate;
    });
    if (!userCheckinOnSameDate) {
      return null;
    }

    return userCheckinOnSameDate;
  }

  async findHistoryCheckinsByUserId(userId: string, page: number) {
    const historyCheckins = this.itens
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);

    return historyCheckins;
  }
}
