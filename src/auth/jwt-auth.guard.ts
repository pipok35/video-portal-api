import { ExecutionContext,  Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        if (user) {
            request.user = user
        }
        return user
    }
}
