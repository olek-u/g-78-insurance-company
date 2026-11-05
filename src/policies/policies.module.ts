
import { Module } from '@nestjs/common';
import { PoliciesController } from './policies.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './policy.entity.js';

@Module({
  controllers: [PoliciesController],
  imports: [TypeOrmModule.forFeature([Policy])],
})
export class PoliciesModule {}