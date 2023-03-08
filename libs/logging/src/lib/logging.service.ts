import { Injectable } from '@nestjs/common';
import { ErrorWithMessage, isErrorWithMessage } from './ErrorWithMessage';

@Injectable()
export class LoggingService {
  public toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
    if (isErrorWithMessage(maybeError)) return maybeError;

    try {
      return new Error(JSON.stringify(maybeError));
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return new Error(String(maybeError));
    }
  };

  public getErrorMessage = (error: unknown) => {
    return this.toErrorWithMessage(error).message;
  };
}
