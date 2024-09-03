import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function UpdatePatchSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Update Patch Todo'),
    ApiOkResponse({
      schema: {
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
        example: {
          userId: 1,
          id: 1,
          title: 'Buy some vegetables and milk',
          completed: true,
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'array',
            items: { type: 'string' },
          },
          error: { type: 'string' },
          statusCode: { type: 'number' },
        },
        example: {
          message: ['id must be an integer number'],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  );
}
