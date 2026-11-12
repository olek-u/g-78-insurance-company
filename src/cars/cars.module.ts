
import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity.js';
import { CarsRepository } from './cars.repository.js';
import { CarsService } from './cars.service.js';
import { CarsMapper } from './dto/cars.mapper.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  controllers: [CarsController],
  imports: [TypeOrmModule.forFeature([Car]), UsersModule],
  providers: [CarsRepository, CarsService, CarsMapper],
  exports: [CarsService, CarsMapper],
})
export class CarsModule {}