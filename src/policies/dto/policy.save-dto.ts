
import { InsuranceType } from '../enums/insurance-type.enum.js';
import { Min } from 'class-validator';

export class PolicySaveDto {
  type: InsuranceType;

  @Min(1)
  holderId: number;

  @Min(1)
  agentId: number;

  // добавить более сложное правило
  coverage: number;

  // добавить более сложное правило
  issuedAt: Date;

  // добавить более сложное правило
  expiresAt: Date;
}