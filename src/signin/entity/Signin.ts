import { HttpException, HttpStatus } from "@nestjs/common";

export class Signin {
    constructor(
        private _email: string,
        private _password: string,
    ) {}

    set email(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(email.length === 0) throw new HttpException('Email must not be empty', HttpStatus.UNPROCESSABLE_ENTITY)
        if (!emailRegex.test(email)) throw new HttpException('This email is not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        this._email = email;
    }

    get email(): string {
        return this._email;
    }

    set password(password: string) {
        if(typeof(password) !== 'string') throw new HttpException('Password must be a string', HttpStatus.UNPROCESSABLE_ENTITY);
        if(password.length === 0) throw new HttpException('Password must not be empty', HttpStatus.UNPROCESSABLE_ENTITY);
        if(password.length < 6 || password.length > 20) throw new HttpException('Password must contain between 6 and 20 characters.', HttpStatus.UNPROCESSABLE_ENTITY)

        this._password = password;
    }

    get password(): string {
        return this._password;
    }
}