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
    this.sentchannelstatusMail(channel);
    this.sentchannelstatusMail(channel);
    this.sentchannelupdateMail(channel);
    this.sentchannelnotifyMail(channel);
    this.sentchannelverifyMail(channel);
    this.sentchannelrecommenedMail(channel);
    this.sentchannelratingMail(channel);
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
  public async findvideo(id: string) {
    var channel = await this.channelModel.find({ video: id }).populate('video');
    return {
      response_code: HttpStatus.OK,
      response_data: channel,
    };
  }
  public async findcatogery(id: string) {
    var channel = await this.channelModel.find({ catogery: id }).populate('catogery');
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
  public async sentchannelstatusMail(channel): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentchannelstatusMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sentchannelblockMail(channel): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentchannelblockMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sentchannelupdateMail(channel): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentchannelupdateMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sentchannelnotifyMail(channel): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentchannelnotifyMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sentchannelverifyMail(channel): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentchannelverifyMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sentchannelrecommenedMail(
    channel,
  ): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentchannelrecommenedMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sentchannelratingMail(channel): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentchannelratingMail(channel);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
