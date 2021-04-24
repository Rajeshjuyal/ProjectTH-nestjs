import { Injectable, HttpStatus } from '@nestjs/common';
import { comments } from './comments.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonResponseModel } from '../utils/app-service-data';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CommentsService {
  comments: comments[] = [];
  constructor(
    @InjectModel('comments') private readonly commentsModel: Model<any>,
    private utilsService: UploadService,
  ) {}
  public async create(data: comments) {
    var comments = await this.commentsModel.create(data);
    this.sendCommentsMail(comments);
    return {
      response_code: HttpStatus.OK,
      response_data: comments,
    };
  }

  public async findAll() {
    var comments = await this.commentsModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: comments,
    };
  }
  // public async findvideo(id: string) {
  //   var video = await this.commentsModel.find({ video: id }).populate('video');
  //   return {
  //     response_code: HttpStatus.OK,
  //     response_data: video,
  //   };
  // }

  public async findOne(id: string) {
    var comments = await this.commentsModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: comments,
    };
  }

  public async update(id: string, data: comments) {
    var comments = await this.commentsModel.findByIdAndUpdate(id, data);
    return {
      response_code: HttpStatus.OK,
      response_data: comments,
    };
  }

  public async remove(id: string) {
    var comments = await this.commentsModel.findByIdAndDelete(id);

    return {
      response_code: HttpStatus.OK,
      response_data: comments,
    };
  }
  public async sendCommentsMail(comments): Promise<CommonResponseModel> {
    let res = await this.utilsService.sendCommentsMail(comments);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
