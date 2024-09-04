import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

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

  async createTodo(todo: Todo): Promise<Todo> {
    const data = await this.getByTodoId(todo.id);
    if (data) this.deleteTodo(data.id);

    const newTodo = this.create(todo);
    return this.save(newTodo);
  }

  async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
    return (await this.update({ id }, todo)).raw[0];
  }

  async deleteTodo(id: number): Promise<void> {
    await this.delete({ id });
  }
}
