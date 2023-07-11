import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PublicationsModule } from './publications/publications.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PublicationsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
