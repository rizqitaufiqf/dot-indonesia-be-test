import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ConfigModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
