import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { Gym } from '../../generated/prisma';
import { GymRepository } from '../../repositories/gym-repository';

interface SearchGymRequest {
  query: string;
  page: number;
}

interface SearchGymResponse {
  gyms: Gym[];
}

export class SearchGymService {
  constructor(private gymRepository: GymRepository) {}

  async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.gymRepository.searchByQuery(query, page);

    if (!gyms) {
      throw new ResourceNotFoundError();
    }

    return {
      gyms,
    };
  }
}
