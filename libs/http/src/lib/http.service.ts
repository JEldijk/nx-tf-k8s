import { Injectable, Logger } from '@nestjs/common';
import retry, { AbortError } from 'p-retry';
import axios from 'axios';
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { LoggerService } from '@nestjs/common';
import { Options as RetryOptions } from 'p-retry';
import * as CircuitBreaker from 'opossum';

@Injectable()
export class HttpService {
  constructor(private readonly logger: Logger, logsService: LogsService) {}

  public axiosRequest = async <BODY, RESPONSE>(
    config: AxiosRequestConfig<BODY>,
    retryStatusCodes: number[]
  ): Promise<AxiosResponse<RESPONSE> | void> => {
    const response = await axios
      .request<RESPONSE>(config)
      .catch((error: AxiosError) => {
        // here we can try to handle error so circuit breaker is not triggered
        if (
          !error.response ||
          !error.response.status ||
          error.response.status >= 500 ||
          retryStatusCodes?.includes(error.response.status)
        ) {
          this.logger.log(
            `${config.method} to ${config.baseURL ?? ''}${
              config.url ?? ''
            } failed - throwing up for retrying`
          );
          throw error; // Throw the error further and let the circuit breaker do it's thing
        }
        this.logger.error(
          `${config.method} ${config.baseURL ?? ''}/${
            config.url ?? ''
          } failed with status: ${
            error.response?.status
          } - caught ${this.loggingService.getErrorMessage(
            error
          )}- removing this request`
        );
        throw new AbortError(JSON.stringify(error.response?.data));
      });
    return response;
  };
}
