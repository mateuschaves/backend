import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() signup: SignupDto) {
    return this.authService.signup(signup);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() signin: SigninDto) {
    return this.authService.signin(signin);
  }
}
