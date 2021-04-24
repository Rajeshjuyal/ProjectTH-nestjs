import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { comments } from './comments.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() data: comments) {
    return this.commentsService.create(data);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }
  // @Get('by video/:id')
  // findvideo(@Param('id') id: string) {
  //   return this.commentsService.findvideo(id);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: comments) {
    return this.commentsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
