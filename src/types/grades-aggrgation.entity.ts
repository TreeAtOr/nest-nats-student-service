import { ApiProperty } from "@nestjs/swagger"

export class GradesAggregation {
    @ApiProperty()
    subject: string

    @ApiProperty()
    maxGrade: number

    @ApiProperty()
    minGrade: number

    @ApiProperty()
    avgGrade: number

    @ApiProperty()
    totalGrades: number
}