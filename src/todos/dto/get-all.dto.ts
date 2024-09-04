import { IsBooleanString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllDto {
  @ApiPropertyOptional({
    example: 'true',
    description: 'Todo status',
  })
  @IsOptional()
  @IsBooleanString()
  completed?: string;
}
