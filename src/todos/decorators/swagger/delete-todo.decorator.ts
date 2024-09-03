import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function DeleteTodoSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Delete Todo'),
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
