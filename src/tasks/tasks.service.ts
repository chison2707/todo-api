import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        status: dto.status,
        content: dto.content,
        timeStart: dto.timeStart ? new Date(dto.timeStart) : undefined,
        timeFinish: dto.timeFinish ? new Date(dto.timeFinish) : undefined,
        taskParentId: dto.taskParentId,
        createdById: userId,
      },
    });
  }

  async fillAll() {
    return this.prisma.task.findMany({
      where: { deleted: false },
      include: {
        createdBy: true,
        assignedUsers: true,
      },
    });
  }
}
