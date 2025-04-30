import { Gym } from '../../generated/prisma';
import { GymRepository } from '../../repositories/gym-repository';

interface CreateNewGymProps {
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: number;
  longitude: number;
}

interface RegisterUseCaseResponse {
  gym: Gym;
}

export class CreateNewGymService {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateNewGymProps): Promise<RegisterUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
