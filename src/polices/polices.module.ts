import { Module } from '@nestjs/common';
import { PolicesService } from './polices.service';
import { PolicesController } from './polices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { policesSchema } from './polices.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'polices', schema: policesSchema }]),
  ],
  controllers: [PolicesController],
  providers: [PolicesService],
})
export class PolicesModule {}
