import { ApiProperty } from "@nestjs/swagger"
import { Student } from "./student.entity"

export class Log {
    @ApiProperty()
    date: string

    @ApiProperty()
    subject: string

    @ApiProperty()
    grade: number

    @ApiProperty()
    student: Student
}
