import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { Post } from './entities/post.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import axios, { AxiosResponse } from 'axios';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePutDto } from './dto/update-put-post.dto';
import { UpdatePatchDto } from './dto/update-patch-post.dto';

@Injectable()
export class PostsService {
  private readonly url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAll(): Promise<Post[]> {
    try {
      const cachedPosts = await this.cacheManager.get<Post[]>('posts');
      if (cachedPosts) return cachedPosts;

      const response: AxiosResponse<Post[]> = await axios.get(`${this.url}`);

      await this.postRepository.clear();
      await this.postRepository.save(response.data);

      this.cacheManager.set('posts', response.data);

      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPostById(id: number): Promise<Post> {
    try {
      const cachedPost = await this.cacheManager.get<Post>(`post-${id}`);
      if (cachedPost) return cachedPost;

      const response: AxiosResponse<Post> = await axios.get(
        `${this.url}/${id}`,
      );
      await this.cacheManager.set(`post-${id}`, response.data);

      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        throw new HttpException({}, 404);
      }
      throw new HttpException(
        error?.response?.data || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await axios.post(
        `${this.url}/`,
        post,
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePut(id: number, post: UpdatePutDto): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await axios.put(
        `${this.url}/${id}`,
        post,
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePatch(id: number, post: UpdatePatchDto): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await axios.patch(
        `${this.url}/${id}`,
        post,
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Post> {
    try {
      const response = await axios.delete(`${this.url}/${id}`);
      await this.cacheManager.del(`post-${id}`);
      await this.cacheManager.del('posts');

      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
