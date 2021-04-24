import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CatogeryService } from './catogery.service';
import { catogery } from './catogery.model';

@Controller('catogery')
export class CatogeryController {
  constructor(private readonly catogeryService: CatogeryService) {}

  @Post()
  create(@Body() data: catogery) {
    return this.catogeryService.create(data);
  }

  @Get()
  findAll() {
    return this.catogeryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catogeryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: catogery) {
    return this.catogeryService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catogeryService.remove(id);
  }
}
