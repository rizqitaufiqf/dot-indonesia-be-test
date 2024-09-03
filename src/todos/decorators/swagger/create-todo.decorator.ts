import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function CreateTodoSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Create Todo'),
    ApiCreatedResponse({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          completed: { type: 'boolean' },
          userId: { type: 'number' },
          id: { type: 'number' },
        },
        example: {
          title: 'Buy some vegetables and milk',
          completed: true,
          userId: 1,
          id: 101,
        },
      },
    }),
  );
}
