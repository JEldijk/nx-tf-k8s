import { Logger, Module } from '@nestjs/common';
import { HttpClientBuilderModule } from '@jeldijk/nx-tf-k8s-http';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [HttpClientBuilderModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
