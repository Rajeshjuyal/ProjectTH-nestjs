import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { courseSchema } from './course.model';
import { UsersSchema } from '../users/users.model';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'course', schema: courseSchema },
      { name: 'user', schema: UsersSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, UploadService],
})
export class CourseModule {}
