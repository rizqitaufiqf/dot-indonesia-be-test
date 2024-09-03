import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { BaseSwaggerDecorator } from './base.decorator';

export function GetPostsSwagger() {
  return applyDecorators(
    BaseSwaggerDecorator('Get All Posts'),
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
                body: { type: 'string' },
              },
            },
            example: [
              {
                userId: 1,
                id: 1,
                title:
                  'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
              },
              {
                userId: 1,
                id: 2,
                title: 'qui est esse',
                body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
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
