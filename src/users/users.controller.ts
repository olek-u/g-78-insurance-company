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
import { User } from './user.entity.js';
import { Role } from './enums/role.enum.js';

@Controller('users')
export class UsersController {
  // Здесь (в методах), будет обращение к сервису
  // но пока пишем тренировочный код, который
  // позволит нам протестировать контроллер
  @Post()
  create(@Body() user: User): User {
    console.log('Saved user: ', user);
    user.id = 7;
    return user;
  }

  @Get()
  getAll(): User[] {
    const user1: User = new User();
    user1.name = 'Tom';
    const user2: User = new User();
    user2.name = 'Bob';

    return [user1, user2];
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): User {
    console.log(id);
    const user: User = new User();
    user.name = 'Mary';
    return user;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id', ParseIntPipe) id: number, @Body() user: User): void {
    console.log(id);
    console.log(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id', ParseIntPipe) id: number): void {
    console.log(id);
  }

  @Patch(':id/set-role/:role')
  @HttpCode(HttpStatus.NO_CONTENT)
  setRole(
    @Param('id', ParseIntPipe) id: number,
    @Param('role', new ParseEnumPipe(Role)) role: Role,
  ): void {
    console.log(id);
    console.log(role);
  }
}
