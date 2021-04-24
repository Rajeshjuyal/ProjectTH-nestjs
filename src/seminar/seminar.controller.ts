import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SeminarService } from './seminar.service';
import { seminar } from './seminar.model';

@Controller('seminar')
export class SeminarController {
  constructor(private readonly seminarService: SeminarService) {}

  @Post()
  create(@Body() data: seminar) {
    return this.seminarService.create(data);
  }

  @Get()
  findAll() {
    return this.seminarService.findAll();
  }
  @Get('byuser/:id')
  findusers(@Body() id: string) {
    return this.seminarService.finduser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seminarService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: seminar) {
    return this.seminarService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seminarService.remove(id);
  }
}
