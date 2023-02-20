import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: bcrypt.hashSync(dto.password, 10),
      },
    });
    return this.token(user);
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (!bcrypt.compareSync(dto.password, user.password)) {
      throw new BadRequestException('密码输入错误');
    }
    return this.token(user);
  }
  private async token({ id, name }) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id,
      }),
    };
  }
}
