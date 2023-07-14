import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersRepository } from 'src/user/repository/user.repository';
import { PrismaUsersRepository } from 'src/user/repository/implementations/prisma.user.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    }
  ],
  exports: [AuthService]
})
export class AuthModule { }
