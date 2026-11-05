import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class CarsRepository {
  constructor(
    @InjectRepository(Car)
    private readonly repository: Repository<Car>,
  ) {}

  async save(car: Car): Promise<Car> {
    return this.repository.save(car);
  }

  async findAllActive(): Promise<Car[]> {
    return this.repository.findBy({ active: true });
  }

  async findById(id: number): Promise<Car | null> {
    return this.repository.findOneBy({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
