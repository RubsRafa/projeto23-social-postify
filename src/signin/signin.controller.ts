import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { Signin } from './entity/Signin';

@Controller('signin')
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @Post()
  signIn(@Body() body: Signin) {
    return this.signinService.signIn(body);
  }
}
