import { Length, Matches } from 'class-validator';

export class CarUpdateDto {
  @Length(1, 30)
  @Matches(/^[A-Za-z\- ]+$/, {
    message:
      'Color should contain only capital and small letters, spaces and dashes',
  })
  newColor: string;
}