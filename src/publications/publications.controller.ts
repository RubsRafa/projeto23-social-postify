import { Body, Controller, Get, Post } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDTO } from './dto/create-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  createPublication(@Body() body: CreatePublicationDTO) {
    const userId = 1;
    return this.publicationsService.createPublication(body, userId);
  }

  @Get()
  getUserPublications() {
    const userId = 1;
    return this.publicationsService.getAllPublications(userId);
  }
}
