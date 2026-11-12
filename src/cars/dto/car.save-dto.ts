
import { Length, Matches } from 'class-validator';

export class CarSaveDto {
  @Length(2, 20)
  @Matches(/^[A-Za-z\- ]+$/, {
    message:
      'Brand should contain only capital and small letters, spaces and dashes',
  })
  brand: string;

  @Length(1, 30)
  @Matches(/^[A-Za-z\- ]+$/, {
    message:
      'Model should contain only capital and small letters, spaces and dashes',
  })
  model: string;

  // Добавить дополнительный валидатор
  year: number;

  @Matches(/^[A-Z\d]{17}$/, {
    message:
      'VIN code length 17 symbols and should contain only capital letters and digits',
  })
  vin: string;

  @Length(1, 30)
  @Matches(/^[A-Za-z\- ]+$/, {
    message:
      'Color should contain only capital and small letters, spaces and dashes',
  })
  color: string;
}