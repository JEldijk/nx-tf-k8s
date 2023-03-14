import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';

import { LoggingService } from '@jeldijk/nx-tf-k8s-logging';
import { HttpClientBuilderService } from './http-client-builder.service';

describe('HttpService', () => {
  let service: HttpClientBuilderService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [HttpClientBuilderService, LoggingService, Logger],
    }).compile();

    service = module.get(HttpClientBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
