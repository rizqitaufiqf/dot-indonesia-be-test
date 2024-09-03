import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(dataSource: DataSource) {
    super(Post, dataSource.manager);
  }

  async getAllPost(): Promise<Post[]> {
    return this.find();
  }

  async getByPostId(id: number): Promise<Post> {
    return this.findOne({ where: { id } });
  }

  async createPost(post: Post): Promise<Post> {
    return this.save(post);
  }

  async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    await this.update(id, post);
    return this.getByPostId(id);
  }

  async deletePost(id: number): Promise<void> {
    await this.delete(id);
  }
}
