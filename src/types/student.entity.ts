import { ApiProperty } from "@nestjs/swagger"

export class Student {
    @ApiProperty()
    personalCode: string // персональный код студента

    @ApiProperty()
    name: string // имя студент

    @ApiProperty()
    lastName: string // фамилия студента
}