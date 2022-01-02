import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signup: SignupDto) {
    return this.authService.signup(signup);
  }

  @Post('/signin')
  async signin(@Body() signin: SigninDto) {
    return this.authService.signin(signin);
  }
}
