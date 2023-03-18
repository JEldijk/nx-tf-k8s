import { Injectable } from '@nestjs/common';
import { HttpClientBuilderService } from '@jeldijk/nx-tf-k8s-http';
import { HikingRepositoryService } from '../database/hiking/hiking-repository.service';
import { TrailDto } from './dto/trail.dto';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

type httpbinResult = {
  origin: string;
  url: string;
};

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpClientBuilderService,
    private readonly repo: HikingRepositoryService
  ) {}
  async getData(): Promise<{ message: string; getResult: string }> {
    const result = await this.httpService.axiosRequest<
      httpbinResult,
      undefined
    >(
      {
        url: 'https://httpbin.org/get',
        method: 'get',
      },
      []
    );
    if (!result)
      return {
        message: 'Welcome to hiking!',
        getResult: `failure`,
      };
    return {
      message: 'Welcome to hiking!',
      getResult: `${JSON.stringify(result.data)}`,
    };
  }
  getTrails = (): Observable<Array<TrailDto>> =>
    this.repo
      .getTrails()
      .pipe(map((trails) => plainToInstance(TrailDto, trails)));
}
