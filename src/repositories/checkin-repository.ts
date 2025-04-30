import { CheckIn, Prisma } from '../generated/prisma';

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
  findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findHistoryCheckinsByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countCheckinsByUserId(userId: string): Promise<number>;
  findById(checkinId: string): Promise<CheckIn | null>;
}
