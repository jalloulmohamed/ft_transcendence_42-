/* eslint-disable prettier/prettier */
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Request } from 'express';


const extractCookie = (req: Request ): string | null => {
  if (req.cookies && req.cookies.token) {
      return req.cookies.token;
  }
  if(req.body && req.body.token)
    return req.body.token;
  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
			secretOrKey: process.env.COOKIE_SECRET,
      });
    }
    
    async validate(payload: any) {
      const user = await this.authService.findUser(payload.sub);
      if (!user) {
        throw new UnauthorizedException();
      }
      return  user;
    }
}


// import { Catch, ExceptionFilter, UnauthorizedException, ArgumentsHost } from '@nestjs/common';
// import { Response } from 'express';

// @Catch(UnauthorizedException)
// export class UnauthorizedExceptionFilter implements ExceptionFilter {
//   catch(exception: UnauthorizedException, host: ArgumentsHost) {
//     const response = host.switchToHttp().getResponse<Response>();
//     response.status(401).json({
//       statusCode: 401,
//       message: 'Unauthorized',
//     });
//   }
// }