import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { participationSchema } from './participation.model';
import { UsersSchema } from '../users/users.model';
import { competitionSchema } from '../competition/competition.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'participation', schema: participationSchema },
      { name: 'user', schema: UsersSchema },
      { name: 'competition', schema: competitionSchema },
    ]),
  ],
  controllers: [ParticipationController],
  providers: [ParticipationService],
})
export class ParticipationModule {}
