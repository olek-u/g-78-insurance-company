import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { CarsModule } from './cars/cars.module.js';
import { PoliciesModule } from './policies/policies.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qwerty007',
      database: 'insurance_78',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CarsModule,
    PoliciesModule,
  ],
})
export class AppModule {}