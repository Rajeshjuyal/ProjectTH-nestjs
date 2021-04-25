import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CompetitionController } from './competition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { competitionSchema } from './competition.model';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'competition', schema: competitionSchema },
    ]),
  ],
  controllers: [CompetitionController],
  providers: [CompetitionService, UploadService],
})
export class CompetitionModule {}
