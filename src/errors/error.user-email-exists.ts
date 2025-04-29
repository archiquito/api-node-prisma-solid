export class ErrorUserEmailExists extends Error {
  constructor() {
    super('Email already exists!');
  }
}
