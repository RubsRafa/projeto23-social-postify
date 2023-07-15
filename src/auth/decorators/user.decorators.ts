import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const UserRequest = createParamDecorator((data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if(!request.user) throw new NotFoundException('User not found.');
    console.log('request', request)
    return request.user;
})