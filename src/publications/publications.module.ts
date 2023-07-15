import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationRepository } from './repository/publication.repository';
import { PrismaPublicationRepository } from './repository/implementations/prisma.publication.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { UsersRepository } from 'src/user/repository/user.repository';
import { PrismaUsersRepository } from 'src/user/repository/implementations/prisma.user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService,
    AuthService,
    UserService,
  {
    provide: PublicationRepository,
    useClass: PrismaPublicationRepository,
  },
  {
    provide: UsersRepository,
    useClass: PrismaUsersRepository,
  }
],
exports: [
  PublicationsService,
  {
    provide: PublicationRepository,
    useClass: PrismaPublicationRepository,
  }
]
})
export class PublicationsModule {}
