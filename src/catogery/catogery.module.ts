import { Module } from '@nestjs/common';
import { CatogeryService } from './catogery.service';
import { CatogeryController } from './catogery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { catogerySchema } from './catogery.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'catogery',schema:catogerySchema}])],
  controllers: [CatogeryController],
  providers: [CatogeryService]
})
export class CatogeryModule {}
