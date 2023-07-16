import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PublicationRepository } from './repository/publication.repository';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { UpdatePublicationDTO } from './dto/update-publication.dto';

@Injectable()
export class PublicationsService {

    constructor(private readonly publicationsRepository: PublicationRepository) { }

    async createPublication(body: CreatePublicationDTO, userId: number) {
        const publication = await this.publicationsRepository.findPublicationByTitle(body.title);
        if (publication && publication.userId === userId) throw new HttpException('This publication was already created', HttpStatus.CONFLICT);

        return this.publicationsRepository.createPublication(body, userId)
    }

    async getAllPublications(userId: number) {
        const publications = await this.publicationsRepository.getPublications(userId);
        return publications;
    }

    async  updatePublication(body: UpdatePublicationDTO, userId: number, publicationId: number) {
        const publication = await this.publicationsRepository.findPublicationById(publicationId);
        if(!publication) throw new NotFoundException('Publication was not found.')

        if(publication.userId !== userId) throw new UnauthorizedException('User does not own publication');

        return this.publicationsRepository.updatePublication(body, publicationId);
    }

    async getFilteredPublications(userId: number, published: boolean) {
        const publications = await this.publicationsRepository.getPublications(userId);
        const filter = publications.filter((p) => p.published === published);
        
        return filter;
    }

    async deletePublication(userId: number, id: number) {
        const publication = await this.publicationsRepository.findPublicationById(id);

        if(!publication) throw new NotFoundException('Publication not found.')
        if(publication.userId !== userId) throw new UnauthorizedException('User does not own publication.')

        this.publicationsRepository.deletePublication(id);
        return;
      }
}
