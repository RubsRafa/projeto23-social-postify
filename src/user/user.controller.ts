import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { SigninUserDTO } from './dto/signin-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Post('signin')
  signinUser(@Body() body: SigninUserDTO) {
    return this.userService.signin(body);
  }

}
