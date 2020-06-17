import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Retrieve the logged in user ID from the request context
 */
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const httpContext = context.switchToHttp();
  const req = httpContext.getRequest();
  return req.user;
});
