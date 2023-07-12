import { Publications } from "@prisma/client";
import { CreatePublicationDTO } from "../dto/create-publication.dto";

export abstract class PublicationRepository {
    abstract createPublication(data: CreatePublicationDTO): Promise<Publications>;
    abstract getPublications(id: number): Promise<Publications[]>;
}