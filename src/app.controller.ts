import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { StatisticService } from './statistic/statistic.service';
import { ApiAcceptedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Log } from './types/log.entity';

@Controller()
export class AppController {
  constructor(private readonly statisticService: StatisticService) { }

  @ApiAcceptedResponse({ type: [Log] })
  @ApiBadRequestResponse()
  @Get('/logs')
  getLogs(@Query('perPage') perPage: number, @Query('page') page: number) {
    if (!perPage || !page) throw new BadRequestException();
    return this.statisticService.getLogs(Number(perPage), Number(page));
  }
}
