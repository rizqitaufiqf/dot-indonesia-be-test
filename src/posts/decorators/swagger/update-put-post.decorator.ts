import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function UpdatePutSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Update Put Post'),
    ApiOkResponse({
      schema: {
        type: 'array',
        items: {
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
          title: 'Go to Market',
          body: 'Buy some vegetables and milk',
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
