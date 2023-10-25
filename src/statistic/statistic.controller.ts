import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiAcceptedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Log } from 'src/types/log.entity';
import { Statistic } from 'src/types/statistic.entity';

@Controller('statistic')
export class StatisticController {
    constructor(private readonly statisticService: StatisticService) {}

    @ApiAcceptedResponse({type: Statistic})
    @Get('/:personalCode')
    getStatistics(@Param() personalCode: number) {
        if(!personalCode) throw new BadRequestException();
        return this.statisticService.getStatistics(personalCode);
    }
}
