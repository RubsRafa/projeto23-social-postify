import { HttpException, HttpStatus } from "@nestjs/common";

export class User {
    constructor(
        private _name: string,
        private _email: string,
        private _password: string,
        private _avatar: string,
    ) {}

    set name(name: string) {
        if(name === '' || name.length === 0) throw new HttpException('Name must not be empty', HttpStatus.BAD_REQUEST)
        this._name = name;
    }

    get name(): string {
        return this._name
    }

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

    set avatar(avatar: string) {
        if(avatar === '' || avatar.length === 0) throw new HttpException('Avatar must not be empty', HttpStatus.BAD_REQUEST)
        this._avatar = avatar;
    }

    get avatar(): string {
        return this._avatar;
    }
}