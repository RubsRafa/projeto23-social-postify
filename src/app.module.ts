import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PublicationsModule } from './publications/publications.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PublicationsModule, PrismaModule, AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
