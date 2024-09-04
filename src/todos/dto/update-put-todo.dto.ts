import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePutDto {
  @ApiProperty({
    example: 'Buy some vegetables and milk',
    description: 'Todo title',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: true,
    description: 'Todo status',
  })
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;

  @ApiProperty({
    example: 2,
    description: 'user ID',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'todo ID',
  })
  @IsNotEmpty()
  @IsInt()
  id: number;
}
