import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSigninDTO } from './dto/auth-signin.dto';
import { AuthSignupDTO } from './dto/auth-signup.dto';
import { UserService } from 'src/user/user.service';
import { UsersRepository } from 'src/user/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly usersRepository: UsersRepository,
        private readonly jwTService: JwtService,
    ) {}

    ISSUER = 'Rubs';
    AUDIENCE = 'users'

    async signup(body: AuthSignupDTO) {
        const user = await this.usersService.createUser(body)
        return this.createToken(user);
    }

    async signin(body: AuthSigninDTO) {
        const user = await this.usersRepository.findUserByEmail(body.email);
        if(!user) throw new UnauthorizedException('Email or password is incorrect')

        const validPassword = bcrypt.compareSync(body.password, user.password);
        if(!validPassword) throw new UnauthorizedException('Email or password is incorrect');

        return this.createToken(user);
    }

    createToken(user: { id: number; name: string; email: string; avatar: string; createdAt: Date; }) {
        const token = this.jwTService.sign(
            {
                name: user.name,
                email: user.email,
            }, 
            {
                expiresIn: '7 days',
                subject: String(user.id),
                issuer: this.ISSUER,
                audience: this.AUDIENCE,
            }
        );
        return token;
    }
}
