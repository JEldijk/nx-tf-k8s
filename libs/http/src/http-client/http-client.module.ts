import { LoggingModule } from '@jeldijk/nx-tf-k8s-logging';
import { Logger, Module } from '@nestjs/common';
import CircuitBreaker from 'opossum';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './http-client.module-definition';
import { HttpClientService, HttpOptions } from './http-client.service';

@Module({
  imports: [LoggingModule],
  providers: [
    HttpClientService,
    {
      provide: CircuitBreaker,
      useFactory: (logger: Logger, option: HttpOptions) => {
        return new CircuitBreaker(
          HttpClientService.prototype.request,
          option.circuitBreakerOptions
        )
          .on('open', () => {
            logger.warn(
              `Http client circuit has been opened - service is failing.`
            );
          })
          .on('halfOpen', () => {
            logger.log(
              `Http client circuit is half open - testing if the underlying problem still exists.`
            );
          })
          .on('close', () => {
            logger.log(
              `Http client circuit has been closed - service is restored.`
            );
          })
          .on('semaphoreLocked', () => {
            logger.warn(
              `Http client sepaphore locked - too many concurrent requests`
            );
          })
          .on('timeout', () => {
            logger.log(`Http client request timeout`);
          });
      },
      inject: [Logger, MODULE_OPTIONS_TOKEN],
    },
  ],
})
export class HttpClientModule extends ConfigurableModuleClass {}
