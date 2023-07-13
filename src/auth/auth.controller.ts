import { Body, Controller, Post } from '@nestjs/common';
import { AuthSigninDTO } from './dto/auth-signin.dto';
import { AuthService } from './auth.service';
import { AuthSignupDTO } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async signin(@Body() body: AuthSigninDTO) {
        return this.authService.signin(body);
    }

    @Post()
    async signup(@Body() body: AuthSignupDTO) {
        return this.authService.signup(body);
    }
}
