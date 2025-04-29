import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository';
import { CreateNewGym } from '../services/gym/createNewGym';

export function makeCreateNewGym() {
  const gymsRepository = new PrismaGymRepository();
  const createNewGym = new CreateNewGym(gymsRepository);

  return createNewGym;
}
