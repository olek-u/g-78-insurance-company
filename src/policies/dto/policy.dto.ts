import { CarDto } from '../../cars/dto/car.dto.js';
import { InsuranceType } from '../enums/insurance-type.enum.js';
import { UserDto } from '../../users/dto/user.dto.js';

export class PolicyDto {
  id: number;
  type: InsuranceType;
  holder: UserDto;
  agent: UserDto;
  cars: CarDto[];
  coverage: number;
  issuedAt: Date;
  expiresAt: Date;
}
