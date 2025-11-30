import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { NodeEnv } from 'src/envs';

export class CheckHealthResDto {
  @ApiProperty()
  ok: boolean;

  @ApiProperty()
  env: NodeEnv;

  @ApiProperty()
  dateTime: Date;
}
