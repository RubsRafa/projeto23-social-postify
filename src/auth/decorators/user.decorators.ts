import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const UserRequest = createParamDecorator((data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if(!request.body) throw new NotFoundException('User not found.');

    return request.body;
})