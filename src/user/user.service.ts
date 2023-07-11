import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async createUser(body: CreateUserDTO) {
    const user = await this.usersRepository.findUserByEmail(body.email);
    if (user) throw new HttpException('User already exists.', HttpStatus.CONFLICT);
    return;
  }

}
