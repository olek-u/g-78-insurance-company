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
  ParseEnumPipe,
} from '@nestjs/common';
// import { User } from './user.entity.js';
import { Role } from './enums/role.enum.js';
import { UsersService } from './users.service.js';
import { UserSaveDto } from './dto/user.save-dto.js';
import { UserDto } from './dto/user.dto.js';
import { UserUpdateDto } from './dto/user.update-dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() saveDto: UserSaveDto): Promise<UserDto> {
    return await this.service.create(saveDto);
  }

  @Get()
  async getAll(): Promise<UserDto[]> {
    return await this.service.getAllActiveUsers();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.service.getActiveUserById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UserUpdateDto,
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

  @Patch(':id/set-role/:role')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setRole(
    @Param('id', ParseIntPipe) id: number,
    @Param('role', new ParseEnumPipe(Role)) role: Role,
  ): Promise<void> {
    await this.service.setRole(id, role);
  }
}
