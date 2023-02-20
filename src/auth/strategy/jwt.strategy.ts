import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(congfigService: ConfigService, private prisma: PrismaService) {
    super({
      // 解析Bearer Token数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   加密码的secret
      secretOrKey: congfigService.get('TOKEN_SECRET'),
    });
  }
  //   验证结果
  async validate({ sub: id }) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
