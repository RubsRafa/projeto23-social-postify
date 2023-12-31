import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { SigninUserDTO } from './dto/signin-user.dto';
import { Users } from '@prisma/client';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) { }
  
  async updateUser(body: UpdateUserDTO, user: Users) {
    const userExist = await this.usersRepository.findUserById(user.id);
    if(!userExist) throw new NotFoundException('User not found.');

    return this.usersRepository.updateUser(body, user.id);
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found.');

    return await this.usersRepository.deleteUser(id);
  }

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

  async findUserById(id: number) {
    const user = await this.usersRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

}
