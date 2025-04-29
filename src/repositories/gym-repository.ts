import { Gym, Prisma } from '../generated/prisma';

export interface GymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
}
