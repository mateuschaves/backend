import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.store(createAddressDto);
  }

  @Get()
  async list() {
    return this.addressService.list();
  }
}
