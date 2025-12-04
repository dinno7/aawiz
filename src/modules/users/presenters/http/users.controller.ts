import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/modules/auth/presenters/http/decorators/auth.decorator';
import { AuthTypes } from 'src/modules/auth/presenters/http/types';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from '../../application/users.service';
import { GetUsersResDto } from './dtos/get-users.dto';
import { UserPublic } from '../../domain';
import { type UUID } from 'crypto';

@Controller('users')
// @Policies([RolePolicy(UserRole.ADMIN)])
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

  @Patch(':id/promote')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Promote a user to admin role',
    description: 'Only admins can promote users to admin role',
  })
  @ApiNoContentResponse({
    description: 'User promoted successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  // @ApiForbiddenResponse({
  //   description: 'Permission denied - only admins can access this endpoint',
  // })
  async promoteUser(@Param('id', ParseUUIDPipe) userId: UUID) {
    await this.usersService.promoteUser(userId);
  }

  @Patch(':id/demote')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Demote an admin user to regular user role',
    description: 'Only admins can demote users from admin role',
  })
  @ApiNoContentResponse({
    description: 'User demoted successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  // @ApiForbiddenResponse({
  //   description: 'Permission denied - only admins can access this endpoint',
  // })
  async demoteUser(@Param('id', ParseUUIDPipe) userId: UUID) {
    await this.usersService.demoteUser(userId);
  }
}
