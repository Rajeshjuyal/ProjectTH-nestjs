import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { VideopostService } from './videopost.service';
import { video } from './videopost.model';

@Controller('videopost')
export class VideopostController {
  constructor(private readonly videopostService: VideopostService) {}

  @Post()
  create(@Body() data: video) {
    return this.videopostService.create(data);
  }

  @Get()
  findAll() {
    return this.videopostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videopostService.findOne(id);
  }
  @Get('by channel/:id')
  findchannel(@Param('id') id: string) {
    return this.videopostService.findchannel(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: video) {
    return this.videopostService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videopostService.remove(id);
  }
}
