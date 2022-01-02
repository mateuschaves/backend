import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';
import { Prisma } from '@prisma/client';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(signupDto: SignupDto) {
    const { email, name, password } = signupDto;

    const existUser = await this.getUser({
      email,
    });

    if (existUser) throw new ConflictException('Usuário já existe');

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    return await this.prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
        salt,
      },
    });
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const existUser = await this.getUser({ email });

    if (!existUser)
      throw new UnauthorizedException('Usuário ou senha inválidos !');

    const passwordHash = await bcrypt.hash(password, existUser.salt);

    const isPasswordCorrect = passwordHash === existUser.password;

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Usuário ou senha inválidos !');

    const payload: JwtPayload = { id: existUser.id };

    const accessToken = this.jwtService.sign(payload);

    const user = {
      name: existUser.name,
      email,
    };

    return { ...user, accessToken };
  }

  async getUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findFirst({ where });
  }
}
