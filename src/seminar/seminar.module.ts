import { Module } from '@nestjs/common';
import { SeminarService } from './seminar.service';
import { SeminarController } from './seminar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/users.model';
import { seminarSchema } from './seminar.model';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: UsersSchema },
      { name: 'seminar', schema: seminarSchema },
    ]),
  ],
  controllers: [SeminarController],
  providers: [SeminarService, UploadService],
})
export class SeminarModule {}
