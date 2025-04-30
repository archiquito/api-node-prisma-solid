import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository';
import { FetchGymNearByService } from '../services/gym/fetchGymsNearBy';

export function makeFetchGymNearBy() {
  const gymsRepository = new PrismaGymRepository();
  const gymsNearBy = new FetchGymNearByService(gymsRepository);

  return gymsNearBy;
}
