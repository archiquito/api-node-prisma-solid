import { PrismaGymRepository } from '../repositories/prisma/prisma-gym-repository';
import { CreateNewGymService } from '../services/gym/createNewGym';

export function makeCreateNewGym() {
  const gymsRepository = new PrismaGymRepository();
  const createNewGym = new CreateNewGymService(gymsRepository);

  return createNewGym;
}
