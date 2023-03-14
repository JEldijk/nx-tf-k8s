import { FailedAttemptError } from './interface/FailedAttemptError';
import { Options } from './interface/Options';
import { FailedAttemptErrorImp } from './FailedAttemptErrorImpl';

export const decorateErrorWithCounts = (
  error: Error,
  attemptNumber: number,
  options: Options
): FailedAttemptError => {
  // Minus 1 from attemptNumber because the first attempt does not count as a retry
  const retriesLeft = options.retries
    ? options.retries - (attemptNumber - 1)
    : 0;

  return new FailedAttemptErrorImp(error, attemptNumber, retriesLeft);
};
