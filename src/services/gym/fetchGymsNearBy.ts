import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { Gym } from '../../generated/prisma';
import { GymRepository } from '../../repositories/gym-repository';

interface FetchGymNearByRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchGymNearByResponse {
  gyms: Gym[];
}

export class FetchGymNearByService {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchGymNearByRequest): Promise<FetchGymNearByResponse> {
    const gyms = await this.gymRepository.findGymsNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    if (!gyms) {
      throw new ResourceNotFoundError();
    }

    return {
      gyms,
    };
  }
}
