import { Injectable, HttpStatus } from '@nestjs/common';
import { video } from './videopost.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VideopostService {
  videos: video[] = [];
  constructor(
    @InjectModel('videopost') private readonly videoModel: Model<any>,
  ) {}
  public async create(data: video) {
    var video = await this.videoModel.create(data);
    return {
      response_code: HttpStatus.OK,
      response_data: video,
    };
  }

  public async findAll() {
    var video = await this.videoModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: video,
    };
  }
  public async findchannel(id: string) {
    var video = await this.videoModel.find({ channel: id });
    return {
      response_code: HttpStatus.OK,
      response_data: video,
    };
  }
  public async findOne(id: string) {
    var video = await this.videoModel.findById(id);

    return {
      response_code: HttpStatus.OK,
      response_data: video,
    };
  }

  public async update(id: string, data: video) {
    var video = await this.videoModel.findByIdAndUpdate(id, data);
    return {
      response_code: HttpStatus.OK,
      response_data: video,
    };
  }

  public async remove(id: string) {
    var video = await this.videoModel.findByIdAndDelete(id);

    return {
      response_code: HttpStatus.OK,
      response_data: video,
    };
  }
}
