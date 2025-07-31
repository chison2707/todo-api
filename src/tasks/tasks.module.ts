import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuthMiddlewareMiddleware } from 'src/middleware/auth.middleware/auth.middleware.middleware';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlewareMiddleware)
      // Áp dụng middleware cho tất cả các route trong TasksController
      .forRoutes(TasksController);
  }
}
