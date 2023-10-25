import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Grade } from '@prisma/client';
import { StatisticService } from 'src/statistic/statistic.service';

@Controller('queue')
export class QueueController {
    constructor(private readonly statisticService: StatisticService) { }


    @MessagePattern({
        queue: "students.v1.graded",
    })
    onGradeCreated(@Payload() data: Grade) {
        if(!data) throw new Error('ERR_WRONG_FORMAT')
        if (!data.grade || !data.subject || !data.student_code) throw new Error('ERR_VALIDATION_FAIL');
        this.statisticService.createGrade(data.student_code, data.grade, data.subject);
    }

    @MessagePattern({
        queue: "students.v1.get",
    })
    onGetStudent(@Payload() data: {
        personalCode: string
    }) {
        if(!data) throw new Error('ERR_WRONG_FORMAT')
        if (!data.personalCode) throw new Error('ERR_VALIDATION_FAIL');
        return this.statisticService.getStudent(Number(data.personalCode));
    }
}
