import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchema } from './payment.model';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'payment', schema: paymentSchema }]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, UploadService],
})
export class PaymentModule {}
