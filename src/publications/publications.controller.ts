import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { UserRequest } from 'src/auth/decorators/user.decorators';
import { Users } from '@prisma/client';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';
import { UpdatePublicationDTO } from './dto/update-publication.dto';

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

  @UseGuards(AuthGuard)
  @Put(':id')
  updatePublication(@Param('id') id: number, @Body() body: UpdatePublicationDTO, @UserRequest() user: Users) {
    const userId = user.id;
    const publicationId = Number(id);

    return this.publicationsService.updatePublication(body, userId, publicationId);
  }

  @UseGuards(AuthGuard)
  @Get('filter/:status')
  getFilteredPublications(@UserRequest() user: Users, @Param('status') status: string ) {
    const userId = user.id;
    let published: boolean;

    if(status === 'true') published = true;
    if(status === 'false') published = false;
    
    return this.publicationsService.getFilteredPublications(userId, published);
  }
}
