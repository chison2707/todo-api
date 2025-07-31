import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  async create(@Body() dto: CreateTaskDto, @Req() req: Request) {
    const userId = req.user!.id;
    return this.tasksService.create(dto, userId);
  }

  @Get('all')
  async findAll(@Req() req: Request) {
    const userId = req.user!.id;
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  async detailTask(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user!.id;
    const taskId = parseInt(id);
    return this.tasksService.detailTask(taskId, userId);
  }

  @Patch('changeStatus/:id')
  async changeStatus(
    @Param('id') id: string,
    @Query('status') status: string,
    @Req() req: Request,
  ) {
    const userId = req.user!.id;
    const taskId = parseInt(id);
    return this.tasksService.changeStatus(taskId, status, userId);
  }
}
