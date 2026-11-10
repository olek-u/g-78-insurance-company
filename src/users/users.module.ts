
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { UsersService } from './users.service.js';
import { UsersRepository } from './users.repository.js';
import { UsersMapper } from './dto/users.mapper.js';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepository, UsersMapper],
  exports: [UsersService, UsersMapper],
})
export class UsersModule {}