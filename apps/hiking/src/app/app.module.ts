import { Module } from '@nestjs/common';
import { HttpClientBuilderModule } from '@jeldijk/nx-tf-k8s-http';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpClientBuilderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
