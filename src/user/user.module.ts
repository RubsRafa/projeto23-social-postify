import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './repository/user.repository';
import { PrismaUsersRepository } from './repository/implementations/prisma.user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UserModule { }
