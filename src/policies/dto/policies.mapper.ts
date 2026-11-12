import { Injectable } from '@nestjs/common';
import { UsersMapper } from '../../users/dto/users.mapper.js';
import { CarsMapper } from '../../cars/dto/cars.mapper.js';
import { PolicySaveDto } from './policy.save-dto.js';
import { Policy } from '../policy.entity.js';
import { PolicyDto } from './policy.dto.js';

@Injectable()
export class PoliciesMapper {
  constructor(
    private readonly usersMapper: UsersMapper,
    private readonly carsMapper: CarsMapper,
  ) {}

  mapDtoToEntity(saveDto: PolicySaveDto): Policy {
    const entity: Policy = new Policy();
    entity.type = saveDto.type;
    entity.coverageInCent = saveDto.coverage * 100;
    entity.issueAt = saveDto.issuedAt;
    entity.expiresAt = saveDto.expiresAt;
    return entity;
  }

  mapEntityToDto(entity: Policy): PolicyDto {
    const dto: PolicyDto = new PolicyDto();
    dto.id = entity.id;
    dto.type = entity.type;
    dto.holder = this.usersMapper.mapEntityToDto(entity.holder);
    dto.agent = this.usersMapper.mapEntityToDto(entity.agent);
    dto.cars = this.carsMapper.mapEntityListToDtoList(entity.cars);
    dto.coverage = entity.coverageInCent / 100;
    dto.issuedAt = entity.issueAt;
    dto.expiresAt = entity.expiresAt;
    return dto;
  }

  mapEntityListToDtoList(entityList: Policy[]): PolicyDto[] {
    return entityList.map((policy: Policy): PolicyDto =>
      this.mapEntityToDto(policy),
    );
  }
}
