import { Injectable } from "@nestjs/common";
import { PublicationRepository } from "../publication.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePublicationDTO } from "src/publications/dto/create-publication.dto";

@Injectable()
export class PrismaPublicationRepository implements PublicationRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createPublication(data: CreatePublicationDTO, userId: number) {
        return await this.prisma.publications.create({ data: {
            userId,
            image: data.image,
            title: data.title,
            text: data.text,
            dateToPublish: data.dateToPublish,
            socialMedia: data.socialMedia
        } })
    }

    async getPublications(id: number) {
        return await this.prisma.publications.findMany({where: { userId: id}})
    }

    async findPublicationByTitle(title: string) {
        return await this.prisma.publications.findUnique({ where: { title }});
    }

}