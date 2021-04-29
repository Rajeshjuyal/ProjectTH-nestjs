import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { course } from './course.model';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() data: course) {
    return this.courseService.create(data);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }
  @Get('byuser/:id')
  findusers(@Body() id: string) {
    return this.courseService.finduser(id);
  }
  @Post('upload/')
  upload(@Body() coursedata: course[]) {
    console.log(coursedata);
    return this.courseService.upload(coursedata);
  }

  @Post('uploadExcel/')
  uploadExcel(@Body() coursedata: any) {
    console.log(coursedata);
    return this.courseService.uploadExcel(coursedata);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: course) {
    return this.courseService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
