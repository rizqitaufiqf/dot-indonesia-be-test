import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TodosModule } from './todos/todos.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [ConfigModule, TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
