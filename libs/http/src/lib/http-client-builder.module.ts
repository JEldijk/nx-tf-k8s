import { Module, Global, Logger } from '@nestjs/common';
import { LoggingModule } from '@jeldijk/nx-tf-k8s-logging';
import { HttpClientBuilderService } from './http-client-builder.service';

@Global()
@Module({
  imports: [LoggingModule],
  providers: [HttpClientBuilderService, Logger],
  exports: [HttpClientBuilderService],
})
export class HttpClientBuilderModule {}
