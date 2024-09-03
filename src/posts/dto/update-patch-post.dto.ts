import { IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePatchDto {
  @ApiPropertyOptional({ example: 'Go to Market', description: 'Post title' })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({
    example: 'Buy some vegetables and milk',
    description: 'Post body',
  })
  @IsOptional()
  body: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'user ID',
  })
  @IsOptional()
  @IsInt()
  userId: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'post ID',
  })
  @IsOptional()
  @IsInt()
  id: number;
}
