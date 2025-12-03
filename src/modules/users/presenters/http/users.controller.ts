import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/modules/auth/presenters/http/decorators/auth.decorator';
import { AuthTypes } from 'src/modules/auth/presenters/http/types';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../../application/users.service';
import { GetUsersResDto } from './dtos/get-users.dto';
import { UserPublic } from '../../domain';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth(AuthTypes.Bearer)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: 'excludeAll',
    type: GetUsersResDto,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users just for simplify to use other endpoints',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all users',
    type: [GetUsersResDto],
  })
  async getAll(): Promise<UserPublic[]> {
    const users = await this.usersService.getUsers();
    return users;
  }
}
