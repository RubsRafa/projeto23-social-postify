import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Signin } from './entity/Signin';

@Injectable()
export class SigninService {
  users = [];
  signIn(body: Signin) {
    const userExist = this.users.find((u) => u.email === body.email);
    if(!userExist) throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
    return;
  }
}
