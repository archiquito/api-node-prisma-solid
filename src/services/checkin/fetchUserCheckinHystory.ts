import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { CheckIn } from '../../generated/prisma';
import { CheckInRepository } from '../../repositories/checkin-repository';

interface FetchUserCheckinHystoryRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckinHystoryResponse {
  historyCheckins: CheckIn[];
}

export class FetchCheckInHistory {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckinHystoryRequest): Promise<FetchUserCheckinHystoryResponse> {
    const historyCheckins =
      await this.checkInRepository.findHistoryCheckinsByUserId(userId, page);

    if (!historyCheckins) {
      throw new ResourceNotFoundError();
    }

    return {
      historyCheckins,
    };
  }
}
