import { Global, HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

import { UploadModule } from './upload/upload.module';

import { NotificationsModule } from './notifications/notifications.module';

import { ScheduleModule } from 'nest-schedule';

import { SettingModule } from './setting/setting.module';

import { AppGateway } from './app.gateway';

import { NotificationsSchema } from './notifications/notifications.model';
import { CourseModule } from './course/course.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SeminarModule } from './seminar/seminar.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CommentsModule } from './comments/comments.module';
import { PaymentModule } from './payment/payment.module';
import { ChannelModule } from './channel/channel.module';
import { CatogeryModule } from './catogery/catogery.module';
import { CompetitionModule } from './competition/competition.module';
import { ParticipationModule } from './participation/participation.module';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri:
          process.env.NODE_ENV == 'production'
            ? process.env.MONGO_DB_PRODUCTION_URL
            : process.env.MONGO_DB_TESTING_URL,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }),
    }),
    UsersModule,

    UploadModule,

    NotificationsModule,
    ScheduleModule.register(),

    SettingModule,

    MongooseModule.forFeature([
      { name: 'Notifications', schema: NotificationsSchema },
    ]),

    CourseModule,

    PurchaseModule,

    SeminarModule,
    SubscriptionModule,
    CommentsModule,
    PaymentModule,
    ChannelModule,
    CatogeryModule,
    CompetitionModule,
    ParticipationModule,
  ],
  controllers: [],
  providers: [AppGateway],
  exports: [AppGateway],
})
export class AppModule {}
