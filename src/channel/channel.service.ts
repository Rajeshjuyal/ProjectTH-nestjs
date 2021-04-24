import { Injectable, HttpStatus } from '@nestjs/common';
import { channel, channelSchema } from './channel.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UploadService } from '../upload/upload.service';
import { CommonResponseModel } from '../utils/app-service-data';

@Injectable()
export class ChannelService {
  channels: channel[] = [];
  constructor(
    @InjectModel('channel') private readonly channelModel: Model<any>,
    private utilsService: UploadService,
  ) {}
  public async create(data: channel) {
    var channel = await this.channelModel.create(data);
    this.sentchannelMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: channel,
    };
  }

  public async findAll() {
    var channel = await this.channelModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: channel,
    };
  }

  public async findOne(id: string) {
    var channel = await this.channelModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: channel,
    };
  }
  public async finduser(id: string) {
    var channel = await this.channelModel.find({ user: id }).populate('user');
    return {
      response_code: HttpStatus.OK,
      response_data: channel,
    };
  }

  public async update(id: string, data: channel) {
    var channel = await this.channelModel.findByIdAndUpdate(id, channel);
    return {
      response_code: HttpStatus.OK,
      response_data: channel,
    };
  }

  public async remove(id: string) {
    var channel = await this.channelModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: channel,
    };
  }
  public async sentchannelMail(channel): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentchannelMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
