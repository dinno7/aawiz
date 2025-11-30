import { Injectable } from '@nestjs/common';
import { UserPublic } from 'src/modules/users/domain';
import { HashingService } from 'src/shared';
import { UsersService } from 'src/modules/users/application/users.service';
import { SignupCommand } from '../commands/signup.command';
import { UserAlreadyExistsError } from '../errors/user-already-exists.error';

@Injectable()
export class SignupUC {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async execute({ name, email, ...user }: SignupCommand): Promise<UserPublic> {
    const isEmailExists = await this.userService.isUserEmailExists(email);
    if (isEmailExists) {
      throw new UserAlreadyExistsError('The email already exists');
    }

    const hashedPassword = await this.hashingService.hash(user.password);
    user.password = '';
    return this.userService.createUser({
      email,
      name,
      password: hashedPassword,
    });
  }
}
