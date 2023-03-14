export class AbortError extends Error {
  override readonly name: 'AbortError';
  readonly originalError: Error;
  /**
	Abort retrying and reject the promise.

	@param message - An error message or a custom error.
	*/
  constructor(message: string | Error) {
    super();

    if (message instanceof Error) {
      this.originalError = message;
      ({ message } = message);
    } else {
      this.originalError = new Error(message);
      this.originalError.stack = this.stack;
    }

    this.name = 'AbortError';
    this.message = message;
  }
}
