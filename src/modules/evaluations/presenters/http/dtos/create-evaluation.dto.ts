import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { type UUID } from 'crypto';
import { EvaluationStatus } from 'src/modules/evaluations/domain';

export class CreateEvaluationDto {
  @IsString()
  @MaxLength(225)
  @IsNotEmpty()
  @ApiProperty({ default: 'evaluation of someone' })
  title: string;

  @IsString()
  @MaxLength(2048)
  @IsNotEmpty()
  @ApiProperty({ default: 'just some note for future' })
  note: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ default: 73 })
  score: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ default: 'b835a73c-955f-40a0-a761-3af6798f94dd' })
  relatedUserId: UUID;
}

export class CreateEvaluationResDto {
  @ApiProperty()
  id: UUID;
  @ApiProperty()
  title: string;
  @ApiProperty()
  score: number;
  @ApiProperty({ required: false })
  note?: string;
  @ApiProperty()
  status: EvaluationStatus;
  @ApiProperty()
  evaluatedId: UUID;
  @ApiProperty()
  evaluatorId: UUID;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
