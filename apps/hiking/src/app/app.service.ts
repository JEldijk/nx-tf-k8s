import { Injectable } from '@nestjs/common';
import { HttpClientBuilderService } from '@jeldijk/nx-tf-k8s-http';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpClientBuilderService) {}
  getData(): { message: string } {
    return { message: 'Welcome to hiking!' };
  }
}
