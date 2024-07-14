import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(d: RegisterDto) {
    this.username = d.username;
    this.email = d.email;
    this.password = d.password;
  }
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(d: RegisterDto) {
    this.email = d.email;
    this.password = d.password;
  }
}
