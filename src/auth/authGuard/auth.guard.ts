import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { UsersRepository } from "src/user/repository/user.repository";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly authService: AuthService, private readonly userRepository: UsersRepository) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers();

        try {
            const token = authorization?.split(' ');
            const data = this.authService.checkToken(token);
            const user = await this.userRepository.findUserById(Number(data.sub));

            request.user = user;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}