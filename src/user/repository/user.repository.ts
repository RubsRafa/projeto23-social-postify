import { Users } from "@prisma/client";
import { CreateUserDTO } from "../dto/create-user.dto";

export abstract class UsersRepository {
  abstract deleteUser(id: number): Promise<Users>;
  abstract createUser(data: CreateUserDTO): Promise<Users>;
  abstract findUserByEmail(email: string): Promise<Users>;
  abstract findUserById(id: number): Promise<Users>;
}