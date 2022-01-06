import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [AuthModule, AddressModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
