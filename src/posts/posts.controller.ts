import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';

@Controller({
  path: 'posts',
  version: '1',
})
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Post()
  create(@Body() post: PostEntity) {
    return this.postService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() post: PostEntity) {
    return this.postService.updatePut(id, post);
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() post: Partial<PostEntity>) {
    return this.postService.updatePatch(id, post);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
