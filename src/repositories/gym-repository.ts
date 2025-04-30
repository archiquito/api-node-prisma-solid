import { Gym, Prisma } from '../generated/prisma';

export interface FindGymsNearByParams {
  latitude: number;
  longitude: number;
}

export interface GymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchByQuery(query: string, page: number): Promise<Gym[] | null>;
  findGymsNearBy(params: FindGymsNearByParams): Promise<Gym[] | null>;
}
