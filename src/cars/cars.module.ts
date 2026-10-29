import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller.js';

@Module({
  controllers: [CarsController],
})
export class CarsModule {}
