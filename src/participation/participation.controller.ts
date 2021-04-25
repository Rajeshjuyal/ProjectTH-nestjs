import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { participation } from './participation.model';


@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  create(@Body() data: participation) {
    return this.participationService.create(data);
  }

  @Get()
  findAll() {
    return this.participationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participationService.findOne(id);
  }
  @Get('byuser/:id')
  findusers(@Body() id: string) {
    return this.participationService.finduser(id);
  }
  @Get('bycompetition/:id')
  findcompetition(@Body() id: string) {
    return this.participationService.findcompetition(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: participation) {
    return this.participationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participationService.remove(id);
  }
}
