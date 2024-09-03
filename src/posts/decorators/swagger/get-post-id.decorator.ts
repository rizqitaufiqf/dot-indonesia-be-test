import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function GetPostsByIdSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Get Post By ID'),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          userId: { type: 'number' },
          title: { type: 'string' },
          body: { type: 'string' },
        },
      },
      example: {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
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
