import { IsBooleanString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllDto {
  @ApiPropertyOptional({
    example: '',
    description: 'Todo status (can be true or false or empty)',
  })
  @IsOptional()
  @IsBooleanString()
  completed?: string;
}
