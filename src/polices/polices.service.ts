import { Injectable, HttpStatus } from '@nestjs/common';
import { polices } from './polices.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';

@Injectable()
export class PolicesService {
  polices: polices[] = [];
  constructor(
    @InjectModel('polices') private readonly policesModel: Model<any>,
  ) {}
  public async create(data: polices) {
    var polices = await this.policesModel.create(data);
    return {
      response_code: HttpStatus.OK,
      response_data: polices,
    };
  }

  public async findAll() {
    var polices = await this.policesModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: polices,
    };
  }

  public async findOne(id: string) {
    var polices = await this.policesModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: polices,
    };
  }

  public async update(id: string, data: polices) {
    var polices = await this.policesModel.findByIdAndUpdate(id, data);
    return {
      response_code: HttpStatus.OK,
      response_data: polices,
    };
  }

  public async remove(id: string) {
    var polices = await this.policesModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: polices,
    };
  }
}
