import { Publications } from "@prisma/client";
import { CreatePublicationDTO } from "../dto/create-publication.dto";
import { UpdatePublicationDTO } from "../dto/update-publication.dto";

export abstract class PublicationRepository {
    updatePublication(body: UpdatePublicationDTO, publicationId: number) {
        throw new Error('Method not implemented.');
    }
    abstract createPublication(data: CreatePublicationDTO, userId: number): Promise<Publications>;
    abstract getPublications(id: number): Promise<Publications[]>;
    abstract findPublicationByTitle(title: string): Promise<Publications>;
    abstract findPublicationById(id: number): Promise<Publications>;
}