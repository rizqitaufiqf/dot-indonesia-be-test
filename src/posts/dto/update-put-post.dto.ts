import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePutDto {
  @ApiProperty({ example: 'Go to Market', description: 'Post title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Buy some vegetables and milk',
    description: 'Post body',
  })
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    example: 2,
    description: 'user ID',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'post ID',
  })
  @IsNotEmpty()
  @IsInt()
  id: number;
}
