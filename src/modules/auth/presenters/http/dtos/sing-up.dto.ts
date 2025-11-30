import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Taha Delroba' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'tahadlrb7@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '1234' })
  password: string;
}
