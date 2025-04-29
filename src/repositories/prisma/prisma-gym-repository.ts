import { prisma } from '../../lib/prisma';
import { Prisma } from '../../generated/prisma';
import { GymRepository } from '../gym-repository';

export class PrismaGymRepository implements GymRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });
    return gym;
  }
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    if (!gym) {
      return null;
    }

    return gym;
  }
}
