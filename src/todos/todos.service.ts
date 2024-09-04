import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './todos.repository';
import { Todo } from './entities/todo.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import axios, { AxiosResponse } from 'axios';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdatePutDto } from './dto/update-put-todo.dto';
import { UpdatePatchDto } from './dto/update-patch-todo.dto';

@Injectable()
export class TodosService {
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';
  constructor(
    private readonly logger: Logger,
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAll(completed?: boolean): Promise<Todo[]> {
    try {
      const cacheName =
        completed === true
          ? 'todos-true'
          : completed === false
            ? 'todos-false'
            : 'todos';

      const cachedTodos = await this.cacheManager.get<Todo[]>(cacheName);
      if (cachedTodos) {
        this.logger.log('Data retrive from cache', TodosService.name);
        return cachedTodos;
      }

      const response: AxiosResponse<Todo[]> = await axios.get(`${this.url}`);
      const filteredTodos =
        completed !== undefined
          ? response.data.filter((todo: Todo) => todo.completed === completed)
          : response.data;

      this.cacheManager.set(cacheName, filteredTodos);

      await this.todoRepository.clear();
      const newTodo = this.todoRepository.create(filteredTodos);
      await this.todoRepository.save(newTodo);

      return filteredTodos;
    } catch (error) {
      this.logger.error(
        error?.response?.data || error?.message || error,
        TodosService.name,
      );
      throw new HttpException(
        error?.response?.data || error?.message || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTodoById(id: number): Promise<Todo> {
    try {
      const cachedTodo = await this.cacheManager.get<Todo>(`todo-${id}`);
      if (cachedTodo) {
        this.logger.log('Data retrive from cache', TodosService.name);
        return cachedTodo;
      }

      const response: AxiosResponse<Todo> = await axios.get(
        `${this.url}/${id}`,
      );

      await this.cacheManager.set(`todo-${id}`, response.data);

      return response.data;
    } catch (error) {
      this.logger.error(
        error?.response?.data || error?.message || error,
        TodosService.name,
      );
      if (error.response.status === 404) {
        throw new HttpException({}, 404);
      }
      throw new HttpException(
        error?.response?.data || error?.message || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    try {
      const response: AxiosResponse<Todo> = await axios.post(
        `${this.url}/`,
        todo,
      );

      await this.todoRepository.createTodo(response.data);
      await this.cacheManager.reset();

      return response.data;
    } catch (error) {
      this.logger.error(
        error?.response?.data || error?.message || error,
        TodosService.name,
      );
      throw new HttpException(
        error?.response?.data || error?.message || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePut(id: number, todo: UpdatePutDto): Promise<Todo> {
    try {
      const response: AxiosResponse<Todo> = await axios.put(
        `${this.url}/${id}`,
        todo,
      );

      const data = await this.getTodoById(id);
      if (data) {
        this.logger.log('exist');
        this.cacheManager.del(`todo-${id}`);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...rest } = response.data;
        this.todoRepository.updateTodo(id, rest);
      }

      return response.data;
    } catch (error) {
      this.logger.error(
        error?.response?.data || error?.message || error,
        TodosService.name,
      );
      throw new HttpException(
        error?.response?.data || error?.message || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePatch(id: number, todo: UpdatePatchDto): Promise<Todo> {
    try {
      const response: AxiosResponse<Todo> = await axios.patch(
        `${this.url}/${id}`,
        todo,
      );

      const data = await this.getTodoById(id);
      if (data) {
        this.logger.log('exist');
        this.cacheManager.del(`todo-${id}`);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...rest } = response.data;
        this.todoRepository.updateTodo(id, rest);
      }

      return response.data;
    } catch (error) {
      this.logger.error(
        error?.response?.data || error?.message || error,
        TodosService.name,
      );
      throw new HttpException(
        error?.response?.data || error?.message || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Todo> {
    try {
      this.logger.log('1');
      const response = await axios.delete(`${this.url}/${id}`);
      await this.cacheManager.reset();

      this.logger.log('2');
      const data = await this.getTodoById(id);
      if (data) {
        this.logger.log('exist');
        await this.todoRepository.deleteTodo(id);
      }

      return response.data;
    } catch (error) {
      this.logger.error(error, TodosService.name);
      throw new HttpException(
        error?.response?.data || error?.message || 'Internal Server Error',
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
