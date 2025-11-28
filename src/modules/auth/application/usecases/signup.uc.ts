import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/domain';
import { UserRepository } from 'src/modules/users/application/ports';
import { HashingService } from 'src/shared';
import { SignUpDto } from '../../dtos/sing-up.dto';
import { UsersService } from 'src/modules/users/application/users.service';

@Injectable()
export class SignupUC {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async execute({ name, email, ...user }: SignUpDto): Promise<User> {
    const isEmailExists = await this.userService.isUserEmailExists(email);
    if (isEmailExists) {
      throw new BadRequestException('The email already exists');
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
