import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationRepository } from './repository/publication.repository';
import { PrismaPublicationRepository } from './repository/implementations/prisma.publication.repository';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService,
  {
    provide: PublicationRepository,
    useClass: PrismaPublicationRepository,
  },
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
