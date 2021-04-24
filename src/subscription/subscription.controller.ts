import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.model';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() subscriptiondata: Subscription) {
    return this.subscriptionService.create(subscriptiondata);
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() subscriptiondata: Subscription) {
    return this.subscriptionService.update(id, subscriptiondata);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionService.remove(id);
  }
}
