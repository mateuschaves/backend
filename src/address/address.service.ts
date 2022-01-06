import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaClient) {}

  async store(createAdrressDto: CreateAddressDto) {
    const {
      cep,
      city,
      street,
      state,
      number,
      neighborhood,
      latitude,
      longitude,
    } = createAdrressDto;

    try {
      return await this.prisma.address.create({
        data: {
          cep,
          city,
          neighborhood,
          number,
          state,
          street,
          latitude,
          longitude,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar endereço');
    }
  }

  async list() {
    return this.prisma.address.findMany();
  }
}
