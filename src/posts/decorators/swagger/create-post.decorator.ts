import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function CreatePostSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Create Post'),
    ApiCreatedResponse({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
          userId: { type: 'number' },
          id: { type: 'number' },
        },
        example: {
          title: 'Go to Market',
          body: 'Buy some vegetables and milk',
          userId: 1,
          id: 101,
        },
      },
    }),
  );
}
