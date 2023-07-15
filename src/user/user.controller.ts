import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { SigninUserDTO } from './dto/signin-user.dto';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';
import { UserRequest } from 'src/auth/decorators/user.decorators';
import { Users } from '@prisma/client';

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

  @UseGuards(AuthGuard)
  @Delete()
  deleteUser(@UserRequest() user: Users) {
    return this.userService.deleteUser(user.id);
  }

}
