import { Module } from '@nestjs/common';
import { StatisticModule } from '../statistic/statistic.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QueueController } from './queue.controller';
import { StatisticService } from 'src/statistic/statistic.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [StatisticModule, PrismaModule, QueueModule],
  providers: [StatisticService, PrismaService],
  controllers: [QueueController]
})
export class QueueModule {}
