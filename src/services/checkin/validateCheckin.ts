import dayjs from 'dayjs';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { CheckIn } from '../../generated/prisma';
import { CheckInRepository } from '../../repositories/checkin-repository';
import { LateCheckInValidationError } from '../../errors/late-checkin-validation-error';

interface ValidateCheckinServiceRequest {
  checkinId: string;
}

interface ValidateCheckinServiceResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkinId,
  }: ValidateCheckinServiceRequest): Promise<ValidateCheckinServiceResponse> {
    const checkIn = await this.checkInRepository.findById(checkinId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
