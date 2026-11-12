
import { Module } from '@nestjs/common';
import { PoliciesController } from './policies.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './policy.entity.js';
import { CarsModule } from '../cars/cars.module.js';
import { UsersModule } from '../users/users.module.js';
import { PoliciesRepository } from './policies.repository.js';
import { PoliciesService } from './policies.service.js';
import { PoliciesMapper } from './dto/policies.mapper.js';

@Module({
  controllers: [PoliciesController],
  imports: [TypeOrmModule.forFeature([Policy]), CarsModule, UsersModule],
  providers: [PoliciesRepository, PoliciesService, PoliciesMapper],
})
export class PoliciesModule {}