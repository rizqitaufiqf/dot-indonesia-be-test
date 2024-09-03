import { applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';

export function BaseSwaggerDecorator(apiOperation: string) {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
        },
        example: {
          statusCode: 500,
          error: 'Internal Server Error',
        },
      },
    }),
    ApiOperation({ summary: apiOperation }),
  );
}
