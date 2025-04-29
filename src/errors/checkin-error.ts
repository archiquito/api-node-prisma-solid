export class CheckInError extends Error {
  constructor() {
    super('You already create a checkin in this day!');
  }
}
