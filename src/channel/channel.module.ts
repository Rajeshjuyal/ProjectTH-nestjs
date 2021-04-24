import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/users.model';
import { channelSchema } from './channel.model';
import { UploadService } from '../upload/upload.service';
import { videoSchema } from '../videopost/videopost.model';
import { catogerySchema } from '../catogery/catogery.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: UsersSchema },
      { name: 'channel', schema: channelSchema },
      { name: 'video', schema: videoSchema },
      { name: 'catogery', schema: catogerySchema },
    ]),
  ],
  controllers: [ChannelController],
  providers: [ChannelService, UploadService],
})
export class ChannelModule {}
