import { Module, Global } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Global()
@Module({
  controllers: [],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
