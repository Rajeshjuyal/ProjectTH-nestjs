import { Module } from '@nestjs/common';
import { VideopostService } from './videopost.service';
import { VideopostController } from './videopost.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { videoSchema } from './videopost.model';
import { channelSchema } from '../channel/channel.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'videopost', schema: videoSchema },
      {name:'channel',schema:channelSchema}
    ]),
  ],
  controllers: [VideopostController],
  providers: [VideopostService],
})
export class VideopostModule {}
