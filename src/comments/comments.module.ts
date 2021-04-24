import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { commentsSchema } from './comments.model';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'comments', schema: commentsSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, UploadService],
})
export class CommentsModule {}
