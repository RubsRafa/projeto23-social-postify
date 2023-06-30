import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SigninModule } from './signin/signin.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [UserModule, SigninModule, PublicationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
