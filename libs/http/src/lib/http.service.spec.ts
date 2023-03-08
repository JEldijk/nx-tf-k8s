import { Test } from '@nestjs/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [HttpService],
    }).compile();

    service = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
