import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { Post } from './entities/post.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAll(): Promise<Post[]> {
    try {
      const cachedPosts = await this.cacheManager.get<Post[]>('posts');
      if (cachedPosts) console.log('cached');
      if (cachedPosts) return cachedPosts;

      const response: AxiosResponse<Post[]> = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
      );

      const postsFromApi = response.data;
      await this.postRepository.clear();
      await this.postRepository.save(postsFromApi);

      // const postsFromDb = await this.postRepository.getAllPost();
      // if (postsFromApi.length !== postsFromDb.length) {
      //   await this.postRepository.clear();
      //   await this.postRepository.save(postsFromApi);
      // }

      this.cacheManager.set('posts', postsFromApi);

      return postsFromApi;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch from external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getPostById(id: number): Promise<Post> {
    try {
      const cachedPost = await this.cacheManager.get<Post>(`post-${id}`);
      if (cachedPost) console.log('cached');
      if (cachedPost) return cachedPost;

      const response: AxiosResponse<Post> = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      const postFromApi = response.data;
      await this.cacheManager.set(`post-${id}`, postFromApi);

      // if (Object.keys(postFromApi).length === 0) {
      //   const postFromDb = await this.postRepository.getByPostId(id);
      //   await this.cacheManager.set(`post-${id}`, postFromDb);
      //   return postFromDb;
      // } else {
      //   await this.cacheManager.set(`post-${id}`, postFromApi);
      // }

      return postFromApi;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch from external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async create(post: Post): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await axios.post(
        `https://jsonplaceholder.typicode.com/posts/`,
        post,
      );
      const newPost = response.data;

      // const postFromDb = await this.postRepository.getByPostId(newPost.id);
      // if (postFromDb) {
      //   await this.postRepository.deletePost(newPost.id);
      // }

      // await this.postRepository.createPost(newPost);
      // await this.cacheManager.del('posts');
      return newPost;
    } catch (error) {
      throw new HttpException(
        'Failed to create post on external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async updatePut(id: number, post: Post): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        post,
      );

      const updatedPost = response.data;
      return updatedPost;
    } catch (error) {
      console.log(error.response.data);
      throw new HttpException(
        'Failed to update post on external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async updatePatch(id: number, post: Partial<Post>): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        post,
      );

      const updatedPost = response.data;
      return updatedPost;
    } catch (error) {
      throw new HttpException(
        'Failed to update post on external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async remove(id: number): Promise<Post> {
    try {
      // await this.postRepository.deletePost(id);
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      await this.cacheManager.del(`post-${id}`);
      await this.cacheManager.del('posts');

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to delete post on external API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
