import * as retry from 'retry';
import { Options } from './interface/Options';
import { AbortError } from './AbortError';
import { isNetworkError, getDOMException } from './NetworkError';
import { decorateErrorWithCounts } from './decorateErrorWithCounts';

/**
Returns a `Promise` that is fulfilled when calling `input` returns a fulfilled promise. If calling `input` returns a rejected promise, `input` is called again until the max retries are reached, it then rejects with the last rejection reason.

Does not retry on most `TypeErrors`, with the exception of network errors. This is done on a best case basis as different browsers have different [messages](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful) to indicate this.
See [whatwg/fetch#526 (comment)](https://github.com/whatwg/fetch/issues/526#issuecomment-554604080)

@param input - Receives the number of attempts as the first argument and is expected to return a `Promise` or any value.
@param options - Options are passed to the [`retry`](https://github.com/tim-kos/node-retry#retryoperationoptions) module.

@example
```
import pRetry, {AbortError} from 'p-retry';
import fetch from 'node-fetch';

const run = async () => {
	const response = await fetch('https://sindresorhus.com/unicorn');

	// Abort retrying if the resource doesn't exist
	if (response.status === 404) {
		throw new AbortError(response.statusText);
	}

	return response.blob();
};

console.log(await pRetry(run, {retries: 5}));

// With the `onFailedAttempt` option:
const result = await pRetry(run, {
	onFailedAttempt: error => {
		console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
		// 1st request => Attempt 1 failed. There are 4 retries left.
		// 2nd request => Attempt 2 failed. There are 3 retries left.
		// …
	},
	retries: 5
});

console.log(result);
```
*/
export default async function pRetry<T>(
  input: (attemptCount: number) => PromiseLike<T> | T,
  inputOptions?: Options
): Promise<T> {
  return new Promise((resolve, reject) => {
    const options = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onFailedAttempt() {},
      retries: 10,
      ...inputOptions,
    };

    const operation = retry.operation(options);

    operation.attempt(async (attemptNumber: number) => {
      try {
        resolve(await input(attemptNumber));
      } catch (error) {
        if (!(error instanceof Error)) {
          reject(
            new TypeError(
              `Non-error was thrown: "${error}". You should only throw errors.`
            )
          );
          return;
        }

        if (error instanceof AbortError) {
          operation.stop();
          reject(error.originalError);
        } else if (
          error instanceof TypeError &&
          !isNetworkError(error.message)
        ) {
          operation.stop();
          reject(error);
        } else {
          const failedAttemptError = decorateErrorWithCounts(
            error,
            attemptNumber,
            options
          );

          try {
            await options.onFailedAttempt(failedAttemptError);
          } catch (error) {
            reject(error);
            return;
          }

          if (!operation.retry(error)) {
            reject(operation.mainError());
          }
        }
      }
    });

    if (options.signal && !options.signal.aborted) {
      options.signal.addEventListener(
        'abort',
        () => {
          operation.stop();
          const reason =
            options.signal?.reason === undefined
              ? getDOMException('The operation was aborted.')
              : options.signal.reason;
          reject(reason instanceof Error ? reason : getDOMException(reason));
        },
        {
          once: true,
        }
      );
    }
  });
}
