import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiTags } from '@nestjs/swagger';
import { GetTodosSwagger } from './decorators/swagger/get-todos.decorator';
import { GetTodosByIdSwagger } from './decorators/swagger/get-todo-id.decorator';
import { CreateTodoSwagger } from './decorators/swagger/create-todo.decorator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdatePutDto } from './dto/update-put-todo.dto';
import { UpdatePatchDto } from './dto/update-patch-todo.dto';
import { UpdatePutSwagger } from './decorators/swagger/update-put-todo.decorator';
import { UpdatePatchSwagger } from './decorators/swagger/update-patch-todo.decorator';
import { DeleteTodoSwagger } from './decorators/swagger/delete-todo.decorator';
import { GetAllDto } from './dto/get-all.dto';

@ApiTags('Todos')
@Controller({
  path: 'todos',
  version: '1',
})
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @GetTodosSwagger()
  @Get()
  getAll(@Query() params?: GetAllDto) {
    if (params.completed === 'true') {
      return this.todoService.getAll(true);
    } else if (params.completed === 'false') {
      return this.todoService.getAll(false);
    }
    return this.todoService.getAll();
  }

  @GetTodosByIdSwagger()
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @CreateTodoSwagger()
  @Post()
  create(@Body() todo: CreateTodoDto) {
    return this.todoService.createTodo(todo);
  }

  @UpdatePutSwagger()
  @Put(':id')
  update(@Param('id') id: number, @Body() todo: UpdatePutDto) {
    return this.todoService.updatePut(id, todo);
  }

  @UpdatePatchSwagger()
  @Patch(':id')
  patch(@Param('id') id: number, @Body() todo: UpdatePatchDto) {
    return this.todoService.updatePatch(id, todo);
  }

  @DeleteTodoSwagger()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}
