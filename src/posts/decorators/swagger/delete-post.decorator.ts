import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function DeletePostSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Delete Post'),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          message: { type: 'object' },
        },
        example: {},
      },
    }),
  );
}
