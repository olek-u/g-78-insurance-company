import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity.js';

@Module({
  controllers: [CarsController],
  imports: [TypeOrmModule.forFeature([Car])],
})
export class CarsModule {}