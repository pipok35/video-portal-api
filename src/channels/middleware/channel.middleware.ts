import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class ChannelMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const channelId = req.headers['channelid']
    if (channelId) {
      req['channel'] = channelId
    }

    next()
  }
}
