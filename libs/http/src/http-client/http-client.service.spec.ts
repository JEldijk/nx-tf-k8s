import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from 'winston';
import { HttpClientModule } from './http-client.module';
import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpClientModule.registerAsync({
          useFactory: (logger: Logger) => ({
            enabled: true,
            logger: logger,
            retryOptions: {},
            circuitBreakerOptions: {},
          }),
          inject: [Logger],
        }),
      ],
    }).compile();

    service = module.get<HttpClientService>(HttpClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
