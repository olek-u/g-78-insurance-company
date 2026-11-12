import { Injectable } from '@nestjs/common';
import { UsersMapper } from '../../users/dto/users.mapper.js';
import { CarSaveDto } from './car.save-dto.js';
import { Car } from '../car.entity.js';
import { CarDto } from './car.dto.js';

@Injectable()
export class CarsMapper {
  constructor(private readonly usersMapper: UsersMapper) {}

  mapDtoToEntity(saveDto: CarSaveDto): Car {
    const entity: Car = new Car();
    entity.brand = saveDto.brand;
    entity.model = saveDto.model;
    entity.year = saveDto.year;
    entity.vin = saveDto.vin;
    entity.color = saveDto.color;
    return entity;
  }

  mapEntityToDto(entity: Car): CarDto {
    const dto: CarDto = new CarDto();
    dto.id = entity.id;
    dto.brand = entity.brand;
    dto.model = entity.model;
    dto.year = entity.year;
    dto.vin = entity.vin;
    dto.color = entity.color;
    dto.owner = this.usersMapper.mapEntityToDto(entity.owner);
    return dto;
  }

  mapEntityListToDtoList(entityList: Car[]): CarDto[] {
    if (!entityList) {
      return [];
    }
    return entityList.map((car: Car): CarDto => this.mapEntityToDto(car));
  }
}
