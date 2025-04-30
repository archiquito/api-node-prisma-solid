import { randomUUID } from 'node:crypto';
import { Gym, Prisma } from '../../generated/prisma';
import { FindGymsNearByParams, GymRepository } from '../gym-repository';
import { getDistanceBetweenCoordinates } from '../../utils/getDistanceBetweenCoordinates';

export class InMemoryGymRepository implements GymRepository {
  public itens: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.itens.push(gym);
    return gym;
  }

  async findById(id: string) {
    const gym = this.itens.find((e) => e.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async searchByQuery(query: string, page: number) {
    const gyms = this.itens
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);

    return gyms;
  }

  async findGymsNearBy(params: FindGymsNearByParams) {
    const gyms = this.itens.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      );
      return distance <= 10;
    });
    return gyms;
  }
}
