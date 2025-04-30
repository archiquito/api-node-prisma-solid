import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository';
import { SearchGymService } from '../services/gym/searchGym';

export function makeSearchGym() {
  const gymsRepository = new PrismaGymRepository();
  const searchGym = new SearchGymService(gymsRepository);

  return searchGym;
}
