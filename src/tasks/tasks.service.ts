import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto, userId: number) {
    if (
      dto.status !== 'todo' &&
      dto.status !== 'doing' &&
      dto.status !== 'done'
    ) {
      throw new UnprocessableEntityException('Trạng thái không hợp lệ');
    }
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

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        deleted: false,
        OR: [
          { createdById: userId },
          {
            assignedUsers: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      include: {
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        assignedUsers: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
        subTasks: true,
        taskParent: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async detailTask(id: number, userId: number) {
    return this.prisma.task.findFirst({
      where: {
        id: id,
        deleted: false,
        createdById: userId,
      },
    });
  }

  async changeStatus(id: number, status: string, userId: number) {
    if (status !== 'todo' && status !== 'doing' && status !== 'done') {
      throw new UnprocessableEntityException('Trạng thái không hợp lệ');
    }
    return this.prisma.task.update({
      where: { id: id, createdById: userId, deleted: false },
      data: { status: status },
    });
  }

  async deleteTask(id: number, userId: number) {
    return this.prisma.task.delete({
      where: {
        id: id,
        createdById: userId,
        deleted: false,
      },
    });
  }
}
