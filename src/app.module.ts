import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StatisticModule } from './statistic/statistic.module';
import { PrismaModule } from './prisma/prisma.module';
import { StatisticService } from './statistic/statistic.service';
import { PrismaService } from './prisma/prisma.service';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [StatisticModule, PrismaModule, QueueModule],
  controllers: [AppController],
  providers: [StatisticService, PrismaService],
})
export class AppModule {}
