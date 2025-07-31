import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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
}
