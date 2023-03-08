import * as CircuitBreaker from 'opossum';
import { Injectable, Logger } from '@nestjs/common';
import retry, { AbortError, Options as RetryOptions } from 'p-retry';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { LoggingService } from '@jeldijk/nx-tf-k8s-logging';

@Injectable()
export class HttpService {
  constructor(
    private readonly logger: Logger,
    private readonly logsService: LoggingService
  ) {}

  public axiosRequest = async <T, D>(
    config: AxiosRequestConfig<D>,
    retryStatusCodes: number[]
  ): Promise<AxiosResponse<T, D> | void> => {
    const response = await axios
      .request<T>(config)
      .catch((error: AxiosError<T, D>) => {
        const safeErrorMessage = this.getSafeErrorMessage<T, D>(config, error);
        if (
          !error.response ||
          !error.response.status ||
          error.response.status >= 500 ||
          retryStatusCodes?.includes(error.response.status)
        ) {
          this.logger.log(`${safeErrorMessage} - throwing up for retrying`);
          throw error; // Throw the error further and let the circuit breaker do it's thing
        }
        this.logger.error(`${safeErrorMessage}- removing this request`);
        throw new AbortError(JSON.stringify(error.response?.data));
      });
    return response;
  };

  public createAxiosBreaker = <D, T>(
    label: string,
    axiosRequest: (
      config: AxiosRequestConfig<D>,
      retryStatusCodes: number[]
    ) => Promise<AxiosResponse<T, D> | void>,
    breakerOptions: CircuitBreaker.Options
  ) => {
    return new CircuitBreaker(axiosRequest, breakerOptions)
      .on('open', () => {
        this.logger.warn(
          `${label} circuit has been opened - service is failing.`
        );
      })
      .on('halfOpen', () => {
        this.logger.log(
          `${label} circuit is half open - testing if the underlying problem still exists.`
        );
      })
      .on('close', () => {
        this.logger.log(
          `${label} circuit has been closed - service is restored.`
        );
      })
      .on('semaphoreLocked', () => {
        this.logger.warn(
          `${label} sepaphore locked - too many concurrent requests`
        );
      })
      .on('timeout', () => {
        this.logger.log(`${label} request timeout`);
      });
  };

  public retryAxiosBreaker = async <T, D>(
    retryOptions: RetryOptions,
    config: AxiosRequestConfig<D>,
    breaker: CircuitBreaker<
      [config: AxiosRequestConfig<D>, retryStatusCodes: number[]],
      AxiosResponse<T, D>
    >,
    retryStatusCodes: number[]
  ): Promise<AxiosResponse<T, D>> => {
    const response = await retry(
      async () => await breaker.fire(config, retryStatusCodes),
      retryOptions
    ).catch((error) => {
      this.logger.error(
        `Final retry ${config.baseURL ?? ''}${
          config.url ?? ''
        } failed - caught: ${this.logsService.toErrorWithMessage(error)}`
      );
      throw error;
    });
    if (!(response instanceof Object)) {
      throw new Error('Unknown response');
    }
    return response;
  };

  private getSafeErrorMessage = <T, D>(
    config: AxiosRequestConfig<D>,
    error: AxiosError<T, D>
  ) => {
    const baseMessage = `${config.method} to ${config.baseURL ?? ''}${
      config.url ?? ''
    } failed`;
    try {
      return `${baseMessage} - caught ${error.toJSON()}`;
    } catch (parseError) {
      return `${baseMessage} - caught ${
        error.name
      } ${this.logsService.getErrorMessage(error)}`;
    }
  };
}
