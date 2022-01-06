import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaClient],
})
export class AddressModule {}
