import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PoliciesService } from './policies.service.js';
import { PolicySaveDto } from './dto/policy.save-dto.js';
import { PolicyDto } from './dto/policy.dto.js';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly service: PoliciesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() saveDto: PolicySaveDto): Promise<PolicyDto> {
    return await this.service.create(saveDto);
  }

  @Get()
  async getAll(): Promise<PolicyDto[]> {
    return await this.service.getAllActivePolicies();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<PolicyDto> {
    return await this.service.getActivePolicyById(id);
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

  @Patch(':policyId/add-car/:carId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addCar(
    @Param('policyId', ParseIntPipe) policyId: number,
    @Param('carId', ParseIntPipe) carId: number,
  ): Promise<void> {
    await this.service.addActiveCarToActivePolicy(policyId, carId);
  }
}