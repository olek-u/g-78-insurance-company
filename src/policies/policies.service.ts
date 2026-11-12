import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service.js';
import { UsersService } from '../users/users.service.js';
import { PoliciesMapper } from './dto/policies.mapper.js';
import { PolicySaveDto } from './dto/policy.save-dto.js';
import { PolicyDto } from './dto/policy.dto.js';
import { Policy } from './policy.entity.js';
import { Car } from '../cars/car.entity.js';
import { PoliciesRepository } from './policies.repository.js';

@Injectable()
export class PoliciesService {
  constructor(

    private readonly repository: PoliciesRepository,
    private readonly carsService: CarsService,
    private readonly usersService: UsersService,
    private readonly mapper: PoliciesMapper,
  ) {}

  async create(saveDto: PolicySaveDto): Promise<PolicyDto> {
    const entity: Policy = this.mapper.mapDtoToEntity(saveDto);
    entity.holder = await this.usersService.getActiveEntityById(
      saveDto.holderId,
    );
    entity.agent = await this.usersService.getActiveEntityById(saveDto.agentId);
    entity.active = true;
    await this.repository.save(entity);
    return this.mapper.mapEntityToDto(entity);
  }

  async getAllActivePolicies(): Promise<PolicyDto[]> {
    const policies: Policy[] = await this.repository.findAllActive();
    return this.mapper.mapEntityListToDtoList(policies);
  }

  async getActivePolicyById(id: number): Promise<PolicyDto> {
    const policy: Policy = await this.getActiveEntityById(id);
    return this.mapper.mapEntityToDto(policy);
  }

  async getActiveEntityById(id: number): Promise<Policy> {
    const policy: Policy | null = await this.repository.findById(id);

    if (!policy || !policy.active) {
      throw Error();
    }

    return policy;
  }

  async deleteById(id: number): Promise<void> {
    const policy: Policy = await this.getActiveEntityById(id);

    if (policy) {
      policy.active = false;
      await this.repository.save(policy);
    }
  }

  async restoreById(id: number): Promise<void> {
    const policy: Policy | null = await this.repository.findById(id);

    if (policy && !policy.active) {
      policy.active = true;
      await this.repository.save(policy);
    }
  }
  async addActiveCarToActivePolicy(
    policyId: number,
    carId: number,
  ): Promise<void> {
    const policy: Policy = await this.getActiveEntityById(policyId);
    const car: Car | null = await this.carsService.getActiveEntityById(carId);

    if (policy && car) {
      policy.cars.push(car);
      await this.repository.save(policy);
    }
  }
}
