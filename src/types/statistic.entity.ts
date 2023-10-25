import { ApiProperty } from "@nestjs/swagger"
import { GradesAggregation } from "./grades-aggrgation.entity"
import { Student } from "./student.entity"



export class Statistic {
    @ApiProperty()
    student: Student
    
    @ApiProperty({type: [GradesAggregation]})
    statistic: GradesAggregation[]
}
