
import { InsuranceType } from './enums/insurance-type.enum.js';
import { User } from '../users/user.entity.js';
import { Car } from '../cars/car.entity.js';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'type', nullable: false, type: 'enum', enum: InsuranceType })
  type: InsuranceType;

  @ManyToOne((): typeof User => User, { nullable: false })
  holder: User;

  @ManyToOne((): typeof User => User, { nullable: false })
  agent: User;

  @ManyToMany((): typeof Car => Car)
  @JoinTable({
    name: 'policy_car',
    joinColumn: { name: 'policy_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'car_id', referencedColumnName: 'id' },
  })
  cars: Car[];
  @Column({ name: 'coverage_in_cent', nullable: false, unique: false })
  coverageInCent: number;

  @Column({ name: 'issue_at', nullable: false, unique: false })
  issueAt: Date;

  @Column({ name: 'expires_at', nullable: false, unique: false })
  expiresAt: Date;

  @Column({ name: 'active', nullable: false, unique: false, default: true })
  active: boolean;
}