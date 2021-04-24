import { Injectable, HttpStatus } from '@nestjs/common';
import { seminar } from './seminar.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonResponseModel } from '../utils/app-service-data';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class SeminarService {
  seminars: seminar[] = [];
  constructor(
    @InjectModel('seminar') private readonly seminarModel: Model<any>,
    @InjectModel('user') private readonly userModel: Model<any>,
    private utilsService: UploadService,
  ) {}
  public async create(data: seminar) {
    var seminar = await this.seminarModel.create(data);
    this.sendseminarMail(seminar);
    return {
      response_code: HttpStatus.OK,
      response_data: seminar,
    };
  }

  public async findAll() {
    var seminars = await this.seminarModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: seminars,
    };
  }
  public async finduser(id: string) {
    var seminar = await this.seminarModel.find({ user: id }).populate('user');
    return {
      response_code: HttpStatus.OK,
      response_data: seminar,
    };
  }

  public async findOne(id: string) {
    var seminar = await this.seminarModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: seminar,
    };
  }

  public async update(id: string, data: seminar) {
    var seminar = await this.seminarModel
      .findByIdAndUpdate(data, seminar)
      .populate('user');
    return {
      response_code: HttpStatus.OK,
      response_data: seminar,
    };
  }

  public async remove(id: string) {
    var seminar = await this.seminarModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: seminar,
    };
  }
  public async sendseminarMail(seminar): Promise<CommonResponseModel> {
    let res = await this.utilsService.sendseminarMail(seminar);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
