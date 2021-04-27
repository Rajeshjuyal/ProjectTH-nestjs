import { Injectable, HttpStatus } from '@nestjs/common';
import { competition } from './competition.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadService } from '../upload/upload.service';
import { CommonResponseModel } from '../utils/app-service-data';
// import { response } from 'express';

@Injectable()
export class CompetitionService {
  competitions: competition[] = [];
  constructor(
    @InjectModel('competition') private readonly competitionModel: Model<any>,
    private utilsService: UploadService,
  ) {}
  public async create(data: competition) {
    var competition = await this.competitionModel.create(data);
    this.sendcompetitionregisterMail(competition);
    this.sendcompetitioncreatedMail(competition);
    this.sendonlinecompetitionMail(competition);
    this.sendcompetitionresultMail(competition);
    this.sendannouncementMail(competition);

    return {
      response_code: HttpStatus.OK,
      response_data: competition,
    };
  }

  public async findAll() {
    var competition = await this.competitionModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: competition,
    };
  }

  public async findOne(id: string) {
    var competition = await this.competitionModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: competition,
    };
  }

  public async update(id: string, data: competition) {
    var competition = await this.competitionModel.findByIdAndUpdate(id, data);
    return {
      response_code: HttpStatus.OK,
      response_data: competition,
    };
  }

  public async remove(id: string) {
    var competition = await this.competitionModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: competition,
    };
  }
  public async sendcompetitioncreatedMail(
    competition,
  ): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentcompetitioncreatedMail(competition);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sendcompetitionregisterMail(
    competition,
  ): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentcompetitionregisterMail(competition);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sendonlinecompetitionMail(
    competition,
  ): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentonlinecompetitionMail(competition);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sendcompetitionresultMail(
    competition,
  ): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentcompetitionresultMail(competition);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
  public async sendannouncementMail(competition): Promise<CommonResponseModel> {
    let res = await this.utilsService.sentannouncementMail(competition);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
