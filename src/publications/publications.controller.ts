import { Body, Controller, Get, Post } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { UserRequest } from 'src/auth/decorators/user.decorators';
import { Users } from '@prisma/client';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  createPublication(@Body() body: CreatePublicationDTO, @UserRequest() user: Users) {
    const userId = user.id;
    return this.publicationsService.createPublication(body, userId);
  }

  @Get()
  getUserPublications(@UserRequest() user: Users) {
    const userId = user.id;
    return this.publicationsService.getAllPublications(userId);
  }
}
