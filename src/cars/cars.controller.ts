import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { Car } from './car.entity.js';

@Controller('cars')
export class CarsController {
  // Здесь (в методах), будет обращение к сервису
  // но пока пишем тренировочный код, который
  // позволит нам протестировать контроллер
  @Post()
  create(@Body() car: Car): Car {
    console.log('Saved car: ', car);
    car.id = 5;
    return car;
  }

  @Get()
  getAll(): Car[] {
    const car1: Car = new Car();
    car1.brand = 'Nissan';
    const car2: Car = new Car();
    car2.brand = 'Toyota';

    return [car1, car2];
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Car {
    console.log(id);
    const car: Car = new Car();
    car.brand = 'Honda';
    return car;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id', ParseIntPipe) id: number, @Body() car: Car): void {
    console.log(id);
    console.log(car);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id', ParseIntPipe) id: number): void {
    console.log(id);
  }

  @Patch(':carId/set-owner/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  setOwner(
    @Param('carId', ParseIntPipe) carId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): void {
    console.log(carId);
    console.log(userId);
  }
}
