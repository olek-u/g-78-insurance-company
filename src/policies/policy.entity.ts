import { InsuranceType } from './enums/insurance-type.enum.js';
import { User } from '../users/user.entity.js';
import { Car } from '../cars/car.entity.js';

export class Policy {
  id: number;
  type: InsuranceType;
  holder: User;
  agent: User;
  cars: Car[];
  coverageInCent: number;
  issueAt: Date;
  expiresAt: Date;
  active: boolean;
}
