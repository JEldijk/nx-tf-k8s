export interface FailedAttemptError extends Error {
  readonly attemptNumber: number;
  readonly retriesLeft: number;
}
