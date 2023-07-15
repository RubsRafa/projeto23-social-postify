import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { UserRequest } from 'src/auth/decorators/user.decorators';
import { Users } from '@prisma/client';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';

@Controller('publication')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createPublication(@Body() body: CreatePublicationDTO, @UserRequest() user: Users) {
    const userId = user.id;
    return this.publicationsService.createPublication(body, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserPublications(@UserRequest() user: Users) {
    const userId = user.id;
    return this.publicationsService.getAllPublications(userId);
  }
}
