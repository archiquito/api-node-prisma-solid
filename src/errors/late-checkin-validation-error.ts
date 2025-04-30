export class LateCheckInValidationError extends Error {
  constructor() {
    super('Your checkin expired, because passed 20min of the creation!');
  }
}
