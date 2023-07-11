import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async createUser(body: CreateUserDTO) {
    const user = await this.usersRepository.findUserByEmail(body.email);
    if (user) throw new HttpException('User already exists.', HttpStatus.CONFLICT);

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

}
