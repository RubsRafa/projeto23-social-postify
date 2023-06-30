import { Controller } from '@nestjs/common';
import { SigninService } from './signin.service';

@Controller('signin')
export class SigninController {
  constructor(private readonly signinService: SigninService) {}
}
