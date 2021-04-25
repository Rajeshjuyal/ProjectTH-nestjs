import { Injectable, HttpStatus } from '@nestjs/common';
import { competition } from 'src/competition/competition.model';
import { participation } from './participation.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ParticipationService {
  participations: participation[] = [];
  constructor(
    @InjectModel('participation')
    private readonly participationModel: Model<any>,
  ) {}
  public async create(data: participation) {
    var participation = await this.participationModel.create(data);
    return {
      response_code: HttpStatus.OK,
      response_data: participation,
    };
  }

  public async findAll() {
    var participation = await this.participationModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: participation,
    };
  }

  public async findOne(id: string) {
    var participation = await this.participationModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: participation,
    };
  }
  public async finduser(id: string) {
    var participation = await this.participationModel
      .find({ user: id })
      .populate('user');
    return {
      response_code: HttpStatus.OK,
      response_data: participation,
    };
  }
  public async findcompetition(id: string) {
    var participation = await this.participationModel
      .find({ competition: id })
      .populate('competition');
    return {
      response_code: HttpStatus.OK,
      response_data: participation,
    };
  }

  public async update(id: string, data: participation) {
    var participation = await this.participationModel.findByIdAndUpdate(
      id,
      data,
    );
    return {
      response_code: HttpStatus.OK,
      response_data: participation,
    };
  }

  public async remove(id: string) {
    var participation = await this.participationModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: participation,
    };
  }
}
