import { Test } from '@nestjs/testing';
import { LogsService } from './logs.service';

describe('LogsService', () => {
  let service: LogsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LogsService],
    }).compile();

    service = module.get(LogsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
