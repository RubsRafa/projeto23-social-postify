import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../user.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "src/user/dto/create-user.dto";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: CreateUserDTO) {
        return await this.prisma.users.create({ data: data });
    }

    async findUserByEmail(email: string) {
        return await this.prisma.users.findUnique({ where: { email }})
    }
}