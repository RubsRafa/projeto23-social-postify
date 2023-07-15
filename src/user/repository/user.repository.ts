import { Users } from "@prisma/client";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UpdateUserDTO } from "../dto/update-user.dto";

export abstract class UsersRepository {
  abstract updateUser(body: UpdateUserDTO, userId: number): Promise<Users>;
  abstract deleteUser(id: number): Promise<Users>;
  abstract createUser(data: CreateUserDTO): Promise<Users>;
  abstract findUserByEmail(email: string): Promise<Users>;
  abstract findUserById(id: number): Promise<Users>;
}