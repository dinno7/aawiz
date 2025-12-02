import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { EvaluationStatus } from 'src/modules/evaluations/domain';

export class UpdateEvaluationDto {
  @IsString()
  @MaxLength(225)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 'evaluation of someone' })
  title: string;

  @IsString()
  @MaxLength(2048)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 'just some note for future' })
  note: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ default: 73 })
  score: number;

  @IsEnum(EvaluationStatus)
  @IsOptional()
  @ApiProperty({ default: EvaluationStatus.APPROVED, enum: EvaluationStatus })
  status?: EvaluationStatus;
}
