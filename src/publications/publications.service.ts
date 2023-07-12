import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './repository/publication.repository';
import { CreatePublicationDTO } from './dto/create-publication.dto';

@Injectable()
export class PublicationsService {
    constructor(private readonly publicationsRepository: PublicationRepository) {}

    async createPublication(body: CreatePublicationDTO, userId: number) {
        
    }
}
