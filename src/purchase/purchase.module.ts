import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { courseSchema } from '../course/course.model';
import { UsersSchema } from '../users/users.model';
import { purchaseSchema } from './purchase.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'purchase', schema: purchaseSchema },
      { name: 'course', schema: courseSchema },
      { name: 'users', schema: UsersSchema },
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
