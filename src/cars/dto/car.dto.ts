import { UserDto } from '../../users/dto/user.dto.js';

export class CarDto {
  id: number;
  brand: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  owner: UserDto;
}
