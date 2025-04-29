import { randomUUID } from 'node:crypto';
import { Gym, Prisma } from '../../generated/prisma';
import { GymRepository } from '../gym-repository';

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
}
