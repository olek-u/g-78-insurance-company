import { Role } from '../enums/role.enum.js';

export class UserDto {
  id: number;
  name: string;
  role: Role;
}
