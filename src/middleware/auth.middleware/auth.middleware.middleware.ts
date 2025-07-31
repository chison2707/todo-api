import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthMiddlewareMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      const user = await this.prisma.user.findUnique({
        where: { token },
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          code: 401,
          message: 'Token không hợp lệ hoặc đã hết hạn',
        });
      }

      // File `src/types/express.d.ts` đã giúp định nghĩa `req.user`
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        code: 401,
        message: 'Vui lòng gửi kèm token (Bearer token)',
      });
    }
  }
}
