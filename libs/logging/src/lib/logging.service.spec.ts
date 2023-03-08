import { Test } from '@nestjs/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LoggingService],
    }).compile();

    service = module.get(LoggingService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
