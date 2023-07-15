import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../user.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { UpdateUserDTO } from "src/user/dto/update-user.dto";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async updateUser(body: UpdateUserDTO, userId: number ) {
        return await this.prisma.users.update({ where: { id: userId }, data: { name: body.name, avatar: body.avatar}})
    }

    async deleteUser(id: number) {
        return await this.prisma.users.delete({ where: { id }})
    }

    async createUser(data: CreateUserDTO) {
        return await this.prisma.users.create({ data: data });
    }

    async findUserByEmail(email: string) {
        return await this.prisma.users.findUnique({ where: { email }})
    }

    async findUserById(id: number) {
        return await this.prisma.users.findUnique({ where: { id }})
    }
}