import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { UsersMapper } from './dto/users.mapper.js';
import { UserSaveDto } from './dto/user.save-dto.js';
import { UserDto } from './dto/user.dto.js';
import { User } from './user.entity.js';
import { Role } from './enums/role.enum.js';
import { UserUpdateDto } from './dto/user.update-dto.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly mapper: UsersMapper,
  ) {}

  async create(saveDto: UserSaveDto): Promise<UserDto> {
    const entity: User = this.mapper.mapDtoToEntity(saveDto);
    entity.role = Role.CUSTOMER;
    entity.active = true;
    // Проверить наличие id
    const newEntity = await this.repository.save(entity);

    return this.mapper.mapEntityToDto(newEntity);
  }

  async getAllActiveUsers(): Promise<UserDto[]> {
    const users: User[] = await this.repository.findAllActive();
    const usersDto: UserDto[] = this.mapper.mapEntityListToDtoList(users);

    return usersDto;
  }

  // Воспомогательный метод, который находит активного пользователя
  async getActiveEntityById(id: number): Promise<User> {
    const user: User | null = await this.repository.findById(id);

    if (!user || !user.active) {
      throw Error();
    }

    return user;
  }

  async getActiveUserById(id: number): Promise<UserDto> {
    const user: User = await this.getActiveEntityById(id);
    const userDto: UserDto = this.mapper.mapEntityToDto(user);

    return userDto;
  }

  async update(id: number, updateDto: UserUpdateDto): Promise<void> {
    const user: User = await this.getActiveEntityById(id);
    user.name = updateDto.newName;
    await this.repository.save(user);
  }

  // soft удаление - меняем active на false
  async deleteById(id: number): Promise<void> {
    const user: User = await this.getActiveEntityById(id);
    user.active = false;
    await this.repository.save(user);
  }

  async restoreById(id: number): Promise<void> {
    const user: User = await this.getActiveEntityById(id);
    user.active = true;
    await this.repository.save(user);
  }

  async setRole(id: number, role: Role): Promise<void> {
    const user: User = await this.getActiveEntityById(id);

    user.role = role;
    await this.repository.save(user);
  }
}
