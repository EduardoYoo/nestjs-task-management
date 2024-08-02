import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//Get user without having to retrieve the whole request object
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    //Get request body whenever a request comes in
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
