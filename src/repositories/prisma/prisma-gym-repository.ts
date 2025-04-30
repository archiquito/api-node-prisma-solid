import { prisma } from '../../lib/prisma';
import { Prisma, Gym } from '../../generated/prisma';
import { FindGymsNearByParams, GymRepository } from '../gym-repository';

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

    return gym;
  }

  async searchByQuery(query: string, page: number) {
    const gyms = prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async findGymsNearBy({ latitude, longitude }: FindGymsNearByParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms 
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}
