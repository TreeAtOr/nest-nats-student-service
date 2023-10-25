import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticService {
    constructor(private readonly prismaService: PrismaService) { }

    async getLogs(perPage: number, page: number) {
        const offset = perPage * page;
        const logs = await this.prismaService.grade.findMany({
            take: perPage,
            skip: offset,
            include: {
                student: true
            }
        });
        return logs;
    }

    async createGrade(studentCode: number, grade: number, subject: string) {
        const student = await this.prismaService.student.findUnique({
            where: {
                personal_code: studentCode
            }
        })
        if (!student) {
            throw new Error('Student not found');
        }
        const newGrade = await this.prismaService.grade.create({
            data: {
                student_code: studentCode,
                grade: grade,
                subject: subject
            }
        })

        return newGrade;
    }

    async getStudent(studentCode: number) {
        const student = await this.prismaService.student.findUnique({
            where: {
                personal_code: studentCode
            }
        })
        if (!student) {
            throw new Error('ERR_ENTITY_NOT_FOUND');
        }
    }

    async getStatistics(studentCode: number) {
        const student = await this.prismaService.student.findUnique({ where: { personal_code: studentCode } });

        const allSubjects = await this.prismaService.grade.findMany({
            select: {
                subject: true
            },
            distinct: ["subject"]
        })
        const statistics = await this.prismaService.grade.groupBy({
            by: ["subject"],
            _min: {
                grade: true
            },
            _max: {
                grade: true
            },
            _avg: {
                grade: true
            },
            _count: {
                grade: true
            }
        })

        const statisticHashMap = new Map(statistics.map(entry => [entry.subject, {
            subject: entry.subject,
            maxGrade: entry._max.grade,
            minGrade: entry._min.grade,
            avgGrade: entry._avg.grade,
            totalGrades: entry._count.grade
        }]))

        const allSubjectsWithStatistics = allSubjects.map(subject => {
            const statistic = statisticHashMap.get(subject.subject);
            if(!statistic) return {
                subject: subject.subject,
                maxGrade: 0,
                minGrade: 0,
                avgGrade: 0,
                totalGrades: 0
            }
            return statistic
        })
        return {
            student,
            statistics: allSubjectsWithStatistics
        }
    }
}
