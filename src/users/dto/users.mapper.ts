import { Injectable } from '@nestjs/common';
import { UserSaveDto } from './user.save-dto.js';
import { User } from '../user.entity.js';
import { UserDto } from './user.dto.js';

@Injectable()
export class UsersMapper {
  mapDtoToEntity(saveDto: UserSaveDto): User {
    const entity: User = new User();
    entity.email = saveDto.email;
    entity.password = saveDto.password;
    entity.name = saveDto.name;

    return entity;
  }

  mapEntityToDto(entity: User): UserDto {
    if (!entity) {
      return new UserDto();
    }

    const dto: UserDto = new UserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.role = entity.role;

    return dto;
  }

  mapEntityListToDtoList(entityList: User[]): UserDto[] {
    return entityList.map((user: User): UserDto => this.mapEntityToDto(user));
  }
}
