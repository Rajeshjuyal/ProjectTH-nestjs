import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { channel } from './channel.model';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(@Body() data: channel) {
    return this.channelService.create(data);
  }

  @Get()
  findAll() {
    return this.channelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelService.findOne(id);
  }
  @Get('byuser/:id')
  findusers(@Body() id: string) {
    return this.channelService.finduser(id);
  }
  @Get('byvideo/:id')
  findvideo(@Body() id: string) {
    return this.channelService.findvideo(id);
  }
  @Get('bycatogery/:id')
  findcatogery(@Body() id: string) {
    return this.channelService.findcatogery(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: channel) {
    return this.channelService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelService.remove(id);
  }
}
