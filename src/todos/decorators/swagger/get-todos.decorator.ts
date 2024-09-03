import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function GetTodosSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Get All Todos'),
    ApiOkResponse({
      schema: {
        oneOf: [
          {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                userId: { type: 'number' },
                title: { type: 'string' },
                completed: { type: 'boolean' },
              },
            },
            example: [
              {
                userId: 1,
                id: 1,
                title: 'electus aut autem',
                completed: false,
              },
              {
                userId: 1,
                id: 2,
                title: 'quis ut nam facilis et officia qui',
                completed: false,
              },
            ],
          },
          {
            type: 'array',
            example: [],
          },
        ],
      },
    }),
  );
}
