import { Injectable, OnModuleInit } from '@nestjs/common';
//import { PrismaClient } from '@prisma/client';
import type { INestApplication } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    const prisma = global.prisma || new PrismaClient();
    if (process.env.NODE_ENV === 'development') {
      global.prisma = prisma;
      await this.$connect();
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    await app.close();
  }
}
