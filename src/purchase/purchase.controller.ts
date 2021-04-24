import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from 'aws-sdk/clients/ec2';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(@Body() data: Purchase) {
    return this.purchaseService.create(data);
  }

  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }
  @Get('byuser/:id')
  findusers(@Body() id: string) {
    return this.purchaseService.finduser(id);
  }
  @Get('bycourse/:id')
  findcourse(@Body() id: string) {
    return this.purchaseService.findcourse(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Purchase) {
    return this.purchaseService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(id);
  }
}
