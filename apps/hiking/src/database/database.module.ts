import { Module } from '@nestjs/common';
import { HikingPrismaClient } from './hiking/hiking-prisma.client';
import { HikingRepositoryService } from './hiking/hiking-repository.service';

@Module({
  providers: [HikingRepositoryService, HikingPrismaClient],
  exports: [HikingRepositoryService, HikingPrismaClient],
})
export class DatabaseModule {}
