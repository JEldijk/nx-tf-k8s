import { FailedAttemptError } from './interface/FailedAttemptError';

export class FailedAttemptErrorImp extends Error implements FailedAttemptError {
  constructor(
    readonly error: Error | FailedAttemptError,
    readonly attemptNumber: number,
    readonly retriesLeft: number
  ) {
    super();
    this.message = error.message;
    this.stack = error.stack;
    this.attemptNumber = attemptNumber;
    this.retriesLeft = retriesLeft;
  }
}
