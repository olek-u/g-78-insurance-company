
import { IsEmail, Length, Matches } from 'class-validator';

export class UserSaveDto {
  @IsEmail()
  email: string;

  @Length(8, 20)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message:
      'Password should contain at least one digit, one capital a one small letter',
  })
  password: string;

  @Length(2, 30)
  @Matches(/^[A-Za-z\- ]+$/, {
    message:
      'Name should contain only capital and small letters, spaces and dashes',
  })
  name: string;
}