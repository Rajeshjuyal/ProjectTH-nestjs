import { Injectable, HttpStatus } from '@nestjs/common';
import { Subscription } from './subscription.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommonResponseModel } from '../utils/app-service-data';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class SubscriptionService {
  subscription: Subscription[] = [];
  constructor(
    @InjectModel('subscription') private readonly subscriptionModel: Model<any>,
    private utilsService: UploadService,
  ) {}
  public async create(Subscription: Subscription) {
    var subscription = await this.subscriptionModel.create(Subscription);
    this.sendsubscriptionMail(subscription);
    return {
      response_code: HttpStatus.OK,
      response_data: subscription,
    };
  }

  public async findAll() {
    var subscription = await this.subscriptionModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: subscription,
    };
  }

  public async findOne(id: string) {
    var subscription = await this.subscriptionModel.findById;
    return {
      response_code: HttpStatus.OK,
      response_data: subscription,
    };
  }

  public async update(id: string, data: Subscription) {
    var Subscription = await this.subscriptionModel.findByIdAndUpdate(
      data,
      Subscription,
    );
    return {
      response_code: HttpStatus.OK,
      response_data: Subscription,
    };
  }

  public async remove(id: string) {
    var subscription = await this.subscriptionModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: subscription,
    };
  }
  public async sendsubscriptionMail(
    subscription,
  ): Promise<CommonResponseModel> {
    let res = await this.utilsService.sendsubscriptionMail(subscription);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
