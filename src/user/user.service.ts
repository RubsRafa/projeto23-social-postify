import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entity/User';

@Injectable()
export class UserService {
  users = [];

  createUser(body: User) {
    const userExist = this.users.find((u) => u.email);
    if(userExist) throw new HttpException('This email is already in use', HttpStatus.CONFLICT);

    this.users.push(body);
    return;
  }

}
