import { LoggingService } from '@jeldijk/nx-tf-k8s-logging';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import pRetry, { AbortError, Options } from '@nx-tf-k8s/p-retry';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import CircuitBreaker from 'opossum';
import { MODULE_OPTIONS_TOKEN } from './http-client.module-definition';

interface RequestQueueOptions {
  checkInterval: number;
  requestPickupTimeout: number;
  maxRequestCount: number;
}

export type HttpOptions = {
  enabled: boolean;
  retryOptions: Options;
  logger: LoggerService;
  circuitBreakerOptions: CircuitBreaker.Options;
  requestQueueOptions?: RequestQueueOptions;
};

@Injectable()
export class HttpClientService {
  constructor(
    private readonly logger: Logger,
    private readonly breaker: CircuitBreaker<
      [config: AxiosRequestConfig, retryStatusCodes: number[]],
      AxiosResponse
    >,
    private readonly logsService: LoggingService,
    @Inject(MODULE_OPTIONS_TOKEN) private options: HttpOptions
  ) {}

  public retryRequest = async <T, D>(
    config: AxiosRequestConfig<D>,
    retryStatusCodes: number[]
  ): Promise<AxiosResponse<T, D>> => {
    const response = await pRetry(
      async () => await this.breaker.fire(config, retryStatusCodes),
      this.options.retryOptions
    ).catch((error) => {
      const saveError = this.logsService.toErrorWithMessage(error);
      this.logger.error(
        `Final retry '${config.method} ${config.baseURL ?? ''}/${
          config.url ?? ''
        }' failed - caught  ${saveError} - throwing`
      );
      throw saveError;
    });
    if (!(response instanceof Object)) {
      throw new Error('Unknown response');
    }
    return response;
  };

  public request = async <T, D>(
    config: AxiosRequestConfig<D>,
    retryStatusCodes: number[]
  ): Promise<AxiosResponse<T, D> | void> => {
    const response = await axios.request<T>(config).catch((error: unknown) => {
      // here we can try to handle error so circuit breaker is not triggered
      const saveError = this.logsService.toErrorWithMessage(error);
      const axiosErrorDetails = this.getAxiosErrorDetails(error);
      const baseUrlString = config.baseURL ? `${config.baseURL}/` : '';
      const requestDetails = `${config.method} ${baseUrlString} ${
        config.url ?? ''
      }`;
      const errorMessage = `${requestDetails} failed ${axiosErrorDetails} - caught ${saveError}`;
      const abortError = new AbortError(errorMessage);
      if (!error) throw abortError;
      if (axios.isAxiosError(error)) {
        if (this.isRetryError(error, retryStatusCodes)) {
          this.logger.log(`${errorMessage} - throwing up for retrying`);
          throw saveError; // Throw the error further and let the circuit breaker do it's thing
        }
      }
      this.logger.error(`${errorMessage} - removing this request`);
      throw new AbortError(saveError as Error);
    });
    return response;
  };

  private getAxiosErrorDetails(error: unknown) {
    let axiosErrorDetails = '';
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
        ? `status ${error.response?.status}`
        : '';
      const code = error.code ? `code ${error.code}` : '';
      const responseBody = error.response?.data
        ? `responseBody ${JSON.stringify(error.response.data)}`
        : '';
      axiosErrorDetails = `- axiosError details: ${status} ${code} ${responseBody}`;
    }
    return axiosErrorDetails;
  }

  private isRetryError(error: AxiosError, retryStatusCodes: number[]) {
    return (
      !error.response?.status ||
      error.response.status >= 500 ||
      retryStatusCodes.includes(error.response.status)
    );
  }
}
