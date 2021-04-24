import { Injectable, HttpStatus, HttpService } from '@nestjs/common';
import { payment } from './payment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonResponseModel } from '../utils/app-service-data';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PaymentService {
  payment: payment[] = [];
  constructor(
    @InjectModel('payment') private readonly paymentModel: Model<any>,
    private utilsService: UploadService,
  ) {}
  public async create(data: payment) {
    var payment = await this.paymentModel.create(data);
    this.sendPaymentmail(payment);
    return {
      response_code: HttpStatus.OK,
      response_data: payment,
    };
  }

  public async findAll() {
    var payment = await this.paymentModel.find();
    return {
      response_code: HttpStatus.OK,
      response_data: payment,
    };
  }

  public async findOne(id: string) {
    var payment = await this.paymentModel.findById(id);
    return {
      response_code: HttpStatus.OK,
      response_data: payment,
    };
  }

  public async update(id: string, data: payment) {
    var payment = await this.paymentModel.findByIdAndUpdate(id, data);
    return {
      response_code: HttpStatus.OK,
      response_data: payment,
    };
  }

  public async remove(id: string) {
    var payment = await this.paymentModel.findByIdAndDelete(id);
    return {
      response_code: HttpStatus.OK,
      response_data: payment,
    };
  }
  public async sendPaymentmail(payment): Promise<CommonResponseModel> {
    let res = await this.utilsService.sendPaymentMail(payment);
    return {
      response_code: HttpStatus.OK,
      response_data: res,
    };
  }
}
