import { Module, Global } from '@nestjs/common';
import { HttpClientBuilderService } from './http-client-builder.service';

@Global()
@Module({
  controllers: [],
  providers: [HttpClientBuilderService],
  exports: [HttpClientBuilderService],
})
export class HttpClientBuilderModule {}
