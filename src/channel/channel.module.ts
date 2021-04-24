import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/users.model';
import { channelSchema } from './channel.model';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: UsersSchema },
      { name: 'channel', schema: channelSchema },
    ]),
  ],
  controllers: [ChannelController],
  providers: [ChannelService, UploadService],
})
export class ChannelModule {}
