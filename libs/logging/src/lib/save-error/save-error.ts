export class SaveError extends Error implements ISaveError {
  constructor(message?: string) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // This clips the stack trace to our custom error
    Error.captureStackTrace(this, this.constructor);

    // If no stack is available, use a default string
    this.stack = this.stack ?? 'no-stack-available';
  }
}

export interface ISaveError extends Error {
  name: string;
  message: string;
  stack?: string;
}

export const isSaveError = (error: unknown): error is ISaveError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>)['message'] === 'string'
  );
};

export const toSaveError = (maybeError: unknown): SaveError => {
  if (isSaveError(maybeError)) return maybeError;

  try {
    return new SaveError(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new SaveError(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown): string => {
  return toSaveError(error).message;
};

export const getErrorStack = (error: unknown): string => {
  return toSaveError(error).stack;
};
