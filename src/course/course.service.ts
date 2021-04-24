import { Injectable, HttpService, HttpStatus } from '@nestjs/common';
import { course } from './course.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CommonResponseModel } from '../utils/app-service-data';
import { UploadService } from '../upload/upload.service';
import { BusinessDTO } from '../business/business.model';

@Injectable()
export class CourseService {
  courses: course[] = [];
  constructor(
    @InjectModel('course') private readonly courseModel: Model<any>,

    private utilsService: UploadService,
  ) {}
  public async create(data: course) {
    var course = await this.courseModel.create(data);
    this.sendCourseMail(course);
    return {
      response_code: HttpStatus.OK,
      response_data: course,
    };
  }

  public async findAll() {
    var course = await this.courseModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: course,
    };
  }

  public async findOne(id: string) {
    var course = await this.courseModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: course,
    };
  }
  public async finduser(id: string) {
    var purchase = await this.courseModel.find({ user: id }).populate('user');
    return {
      response_code: HttpStatus.OK,
      response_data: purchase,
    };
  }

  public async update(id: string, data: course) {
    var course = await this.courseModel.findByIdAndUpdate(id, data);
    return {
      response_code: HttpStatus.OK,
      response_data: course,
    };
  }

  public async remove(id: string) {
    var course = await this.courseModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: course,
    };
  }

  public async sendCourseMail(course): Promise<CommonResponseModel> {
    let res = await this.utilsService.sendcourseMail(course);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
// send invitation mail.
