import { Module, Global } from '@nestjs/common';
import { HttpService } from './http.service';

@Global()
@Module({
  controllers: [],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
