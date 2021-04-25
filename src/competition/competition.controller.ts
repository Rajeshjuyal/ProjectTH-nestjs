import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { competition } from './competition.model';

@Controller('competition')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Post()
  create(@Body() data: competition) {
    return this.competitionService.create(data);
  }

  @Get()
  findAll() {
    return this.competitionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: competition) {
    return this.competitionService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competitionService.remove(id);
  }
}
