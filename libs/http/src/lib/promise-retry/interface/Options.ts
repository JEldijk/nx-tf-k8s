import { OperationOptions } from 'retry';
import { FailedAttemptError } from './FailedAttemptError';

export interface Options extends OperationOptions {
  /**
	Callback invoked on each retry. Receives the error thrown by `input` as the first argument with properties `attemptNumber` and `retriesLeft` which indicate the current attempt number and the number of attempts left, respectively.

	The `onFailedAttempt` function can return a promise. For example, to add a [delay](https://github.com/sindresorhus/delay):

	```
	import pRetry from 'p-retry';
	import delay from 'delay';

	const run = async () => { ... };

	const result = await pRetry(run, {
		onFailedAttempt: async error => {
			console.log('Waiting for 1 second before retrying');
			await delay(1000);
		}
	});
	```

	If the `onFailedAttempt` function throws, all retries will be aborted and the original promise will reject with the thrown error.
	*/
  readonly onFailedAttempt?: (
    error: FailedAttemptError
  ) => void | Promise<void>;

  /**
	You can abort retrying using [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

	When `AbortController.abort(reason)` is called, the promise will be rejected with `reason` as the error message.

	*Requires Node.js 16 or later.*

	```
	import pRetry from 'p-retry';

	const run = async () => { … };
	const controller = new AbortController();

	cancelButton.addEventListener('click', () => {
		controller.abort('User clicked cancel button');
	});

	try {
		await pRetry(run, {signal: controller.signal});
	} catch (error) {
		console.log(error.message);
		//=> 'User clicked cancel button'
	}
	```
	*/
  readonly signal?: AbortSignal;
}
