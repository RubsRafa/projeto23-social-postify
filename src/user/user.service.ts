import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { SigninUserDTO } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async createUser(body: CreateUserDTO) {
    const user = await this.usersRepository.findUserByEmail(body.email);
    if (user) throw new ConflictException('User already exists.');

    const hashedPassword = bcrypt.hashSync(body.password, 10);

    const userCreated = await this.usersRepository.createUser({
      ...body,
      password: hashedPassword,
    })

    return {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      avatar: userCreated.avatar,
      createdAt: userCreated.createdAt,
    }
  }

  async signin(body: SigninUserDTO) {
    const user = await this.usersRepository.findUserByEmail(body.email);
    if(!user) throw new UnauthorizedException('Email or password is incorrect')

    const validPassword = bcrypt.compareSync(body.password, user.password);
    if(!validPassword) throw new UnauthorizedException('Email or password is incorrect')
  }

}
