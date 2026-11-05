import { User } from '../users/user.entity.js';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class Car {

  @PrimaryGeneratedColumn({ name: `id`})
  id: number;

  @Column({name: `brand`, nullable: false, unique: false})
  brand: string;

  @Column({name: `model`, nullable: false, unique: false})
  model: string;

  @Column({name: `year`, nullable: false, unique: false})
  year: number;

  @Column({name: `vin`, nullable: false, unique: true})
  vin: string;

  @Column({name:`color`, nullable: false, unique: false})
  color: string;

  @ManyToOne((): typeof User => User, {nullable: false})
  owner: User;

  @Column({name: `active`, nullable: false, unique: false, default: true})
  active: boolean;
}
