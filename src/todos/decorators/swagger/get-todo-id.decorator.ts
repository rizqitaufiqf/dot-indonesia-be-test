import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function GetTodosByIdSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Get Todo By ID'),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          userId: { type: 'number' },
          title: { type: 'string' },
          completed: { type: 'boolean' },
        },
      },
      example: {
        userId: 1,
        id: 1,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
    }),
    ApiNotFoundResponse({
      schema: {
        type: 'object',
        properties: {},
        example: {},
      },
    }),
  );
}
