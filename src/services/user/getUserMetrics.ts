import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { CheckInRepository } from '../../repositories/checkin-repository';

interface GetUserMetricsRequest {
  userId: string;
}

interface GetUserMetricsResponse {
  countCheckins: number;
}

export class GetUserMetricsService {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const countCheckins =
      await this.checkInRepository.countCheckinsByUserId(userId);

    if (!countCheckins) {
      throw new ResourceNotFoundError();
    }

    return {
      countCheckins,
    };
  }
}
