/* eslint-disable brace-style */
import {
  Logger,
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/hiking';

@Injectable()
export class HikingPrismaClient
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    await this.$connect().catch((error) =>
      Logger.error(
        `Failed to connect with hinking db - caught ${JSON.stringify(error)}`
      )
    );
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      Logger.warn(`hinking db signaled beforeExit- clsoing app`);
      await app.close();
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect().catch((error) =>
      Logger.error(
        `Failed to $disconnect from hinking db - caught ${JSON.stringify(
          error
        )}`
      )
    );
  }
}
