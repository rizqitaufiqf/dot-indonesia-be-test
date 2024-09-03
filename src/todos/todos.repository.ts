import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor(dataSource: DataSource) {
    super(Todo, dataSource.manager);
  }

  async getAllTodo(): Promise<Todo[]> {
    return this.find();
  }

  async getByTodoId(id: number): Promise<Todo> {
    return this.findOne({ where: { id } });
  }

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    return this.save(todo);
  }

  async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.update(id, todo);
    return this.getByTodoId(id);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.delete(id);
  }
}
