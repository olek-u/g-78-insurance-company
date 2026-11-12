import { Length, Matches } from 'class-validator';

export class UserUpdateDto {
  @Length(2, 30)
  @Matches(/^[A-Za-z\- ]+$/, {
    message:
      'Name should contain only capital and small letters, spaces and dashes',
  })
  newName: string;
}