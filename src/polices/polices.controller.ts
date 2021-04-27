import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PolicesService } from './polices.service';
import { polices } from './polices.model';


@Controller('polices')
export class PolicesController {
  constructor(private readonly policesService: PolicesService) {}

  @Post()
  create(@Body() data: polices) {
    return this.policesService.create(data);
  }

  @Get()
  findAll() {
    return this.policesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body()data: polices) {
    return this.policesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policesService.remove(id);
  }
}
