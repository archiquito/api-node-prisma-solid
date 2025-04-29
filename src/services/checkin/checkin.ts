import { CheckInError } from '../../errors/checkin-error';
import { MaxDistanceError } from '../../errors/max-distance-error';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { CheckIn } from '../../generated/prisma';
import { CheckInRepository } from '../../repositories/checkin-repository';
import { GymRepository } from '../../repositories/gym-repository';
import { getDistanceBetweenCoordinates } from '../../utils/getDistanceBetweenCoordinates';

interface CheckinServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckinServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkinOnSameDate = await this.checkInRepository.findUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkinOnSameDate) {
      throw new CheckInError();
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gymId,
    });

    return {
      checkIn,
    };
  }
}
