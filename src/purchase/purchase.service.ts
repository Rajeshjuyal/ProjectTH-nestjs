import { Injectable, HttpStatus } from '@nestjs/common';
import { Purchase } from 'aws-sdk/clients/ec2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PurchaseService {
  purchase: Purchase[] = [];
  constructor(
    @InjectModel('purchase') private readonly purchaseModel: Model<any>,
    @InjectModel('users') private readonly userModel: Model<any>,
    @InjectModel('course') private readonly courseModel: Model<any>,
  ) {}
  public async create(data: Purchase) {
    var purchase = await this.purchaseModel.create(data);
    return {
      response_code: HttpStatus.OK,
      response_data: purchase,
    };
  }

  public async findAll() {
    var purchase = await this.purchaseModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: purchase,
    };
  }
  public async finduser(id: string) {
    var purchase = await this.purchaseModel.find({ user: id }).populate('user');
    return {
      response_code: HttpStatus.OK,
      response_data: purchase,
    };
  }
  public async findcourse(id: string) {
    var purchase = await this.purchaseModel
      .find({ course: id })
      .populate('course');
    return {
      response_code: HttpStatus.OK,
      response_data: purchase,
    };
  }

  public async findOne(id: string) {
    var purchase = await this.purchaseModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: purchase,
    };
  }

  public async update(id: string, data: Purchase) {
    var purchase = await this.purchaseModel.findByIdAndUpdate(id, data);
    return {
      response_code: HttpStatus.OK,
      response_data: purchase,
    };
  }

  public async remove(id: string) {
    var purchase = await this.purchaseModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: purchase,
    };
  }
}
