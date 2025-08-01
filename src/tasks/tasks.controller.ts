import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { Request, Response } from 'express';

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

  @Delete('delete/:id')
  async deleteTask(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userId = req.user!.id;
    const taskId = parseInt(id);
    const result = await this.tasksService.deleteTask(taskId, userId);

    return res.status(200).json({
      message: 'Xóa công việc thành công',
      data: result,
    });
  }

  @Patch('update/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() dto: CreateTaskDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userId = req.user!.id;
    const taskId = parseInt(id);
    const updatedTask = await this.tasksService.updateTask(taskId, dto, userId);

    return res.status(200).json({
      message: 'Cập nhật công việc thành công',
      data: updatedTask,
    });
  }
}
