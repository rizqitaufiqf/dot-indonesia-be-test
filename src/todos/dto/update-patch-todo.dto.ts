import { IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePatchDto {
  @ApiPropertyOptional({
    example: 'Buy some vegetables and milk',
    description: 'Todo title',
  })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Todo status',
  })
  @IsOptional()
  completed: boolean;

  @ApiPropertyOptional({
    example: 2,
    description: 'user ID',
  })
  @IsOptional()
  @IsInt()
  userId: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'todo ID',
  })
  @IsOptional()
  @IsInt()
  id: number;
}
