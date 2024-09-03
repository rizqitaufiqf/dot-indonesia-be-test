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
import { ApiTags } from '@nestjs/swagger';
import { GetPostsSwagger } from './decorators/swagger/get-posts.decorator';
import { GetPostsByIdSwagger } from './decorators/swagger/get-post-id.decorator';
import { CreatePostSwagger } from './decorators/swagger/create-post.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePutDto } from './dto/update-put-post.dto';
import { UpdatePatchDto } from './dto/update-patch-post.dto';
import { UpdatePutSwagger } from './decorators/swagger/update-put-post.decorator';
import { UpdatePatchSwagger } from './decorators/swagger/update-patch-post.decorator';
import { DeletePostSwagger } from './decorators/swagger/delete-post.decorator';

@ApiTags('Posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @GetPostsSwagger()
  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @GetPostsByIdSwagger()
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @CreatePostSwagger()
  @Post()
  create(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }

  @UpdatePutSwagger()
  @Put(':id')
  update(@Param('id') id: number, @Body() post: UpdatePutDto) {
    return this.postService.updatePut(id, post);
  }

  @UpdatePatchSwagger()
  @Patch(':id')
  patch(@Param('id') id: number, @Body() post: UpdatePatchDto) {
    return this.postService.updatePatch(id, post);
  }

  @DeletePostSwagger()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
