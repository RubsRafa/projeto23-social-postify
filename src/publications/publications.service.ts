import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from './repository/publication.repository';
import { CreatePublicationDTO } from './dto/create-publication.dto';

@Injectable()
export class PublicationsService {
    constructor(private readonly publicationsRepository: PublicationRepository) {}

    async createPublication(body: CreatePublicationDTO, userId: number) {
        const publication = await this.publicationsRepository.findPublicationByTitle(body.title);
        if(publication && publication.userId === userId) throw new HttpException('This publication was already created', HttpStatus.CONFLICT);

        return this.publicationsRepository.createPublication(body, userId)
    }

    async getAllPublications(userId: number) {
        const publications = await this.publicationsRepository.getPublications(userId);
        return publications;
    }
}
