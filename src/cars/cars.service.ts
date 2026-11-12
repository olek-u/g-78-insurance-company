import { Injectable } from '@nestjs/common';
import { CarsRepository } from './cars.repository.js';
import { UsersService } from '../users/users.service.js';
import { CarsMapper } from './dto/cars.mapper.js';
import { CarSaveDto } from './dto/car.save-dto.js';
import { CarDto } from './dto/car.dto.js';
import { Car } from './car.entity.js';
import { CarUpdateDto } from './dto/car.update-dto.js';
import { User } from '../users/user.entity.js';

@Injectable()
export class CarsService {
  constructor(
    private readonly repository: CarsRepository,
    private readonly userService: UsersService,
    private readonly mapper: CarsMapper,
  ) {}

  async create(saveDto: CarSaveDto): Promise<CarDto> {
    const entity: Car = this.mapper.mapDtoToEntity(saveDto);
    entity.active = true;
    await this.repository.save(entity);
    return this.mapper.mapEntityToDto(entity);
  }
  async getAllActiveCars(): Promise<CarDto[]> {
    const cars: Car[] = await this.repository.findAllActive();
    return this.mapper.mapEntityListToDtoList(cars);
  }

  async getActiveCarById(id: number): Promise<CarDto | null> {
    const car: Car | null = await this.getActiveEntityById(id);

    if (!car || !car.active) {
      return null;
    }

    return this.mapper.mapEntityToDto(car);
  }

  async getActiveEntityById(id: number): Promise<Car | null> {
    const car: Car | null = await this.repository.findById(id);

    if (!car || !car.active) {
      return null;
    }

    return car;
  }

  async update(id: number, updateDto: CarUpdateDto): Promise<void> {
    const foundCar: Car | null = await this.repository.findById(id);

    if (foundCar) {
      foundCar.color = updateDto.newColor;
      await this.repository.save(foundCar);
    }
  }
  async deleteById(id: number): Promise<void> {
    const car: Car | null = await this.getActiveEntityById(id);

    if (car) {
      car.active = false;
      await this.repository.save(car);
    }
  }

  async restoreById(id: number): Promise<void> {
    const car: Car | null = await this.repository.findById(id);

    if (car && !car.active) {
      car.active = true;
      await this.repository.save(car);
    }
  }

  async setActiveOwnerToActiveCar(
    carId: number,
    ownerId: number,
  ): Promise<void> {
    const car: Car | null = await this.getActiveEntityById(carId);
    const owner: User | null =
      await this.userService.getActiveEntityById(ownerId);

    if (car && owner) {
      car.owner = owner;
      await this.repository.save(car);
    }
  }
}
