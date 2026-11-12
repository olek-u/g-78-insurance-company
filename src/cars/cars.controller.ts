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
import { CarSaveDto } from './dto/car.save-dto.js';
import { CarDto } from './dto/car.dto.js';
import { CarsService } from './cars.service.js';
import { CarUpdateDto } from './dto/car.update-dto.js';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Post()
  async create(@Body() saveDto: CarSaveDto): Promise<CarDto> {
    return await this.service.create(saveDto);
  }

  @Get()
  async getAll(): Promise<CarDto[]> {
    return await this.service.getAllActiveCars();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CarDto | null> {
    return await this.service.getActiveCarById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CarUpdateDto,
  ): Promise<void> {
    await this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.deleteById(id);
  }

  @Patch(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restoreById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.restoreById(id);
  }

  @Patch(':carId/set-owner/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setOwner(
    @Param('carId', ParseIntPipe) carId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.service.setActiveOwnerToActiveCar(carId, userId);
  }
}
