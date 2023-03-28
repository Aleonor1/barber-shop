import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Year } from "src/Entities/Appointments/Year";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";

export class BarberDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsNumber()
  @IsNotEmpty()
  public age: number;

  @IsString()
  @IsNotEmpty()
  public street: string;

  @IsString()
  @IsNotEmpty()
  public city: string;

  @IsString()
  @IsNotEmpty()
  public country: string;

  @IsNotEmpty()
  public nationalities: string[];

  @IsString()
  @IsNotEmpty()
  public postalCode: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public experience: ExperienceLevel;

  @IsString()
  @IsNotEmpty()
  public addressName: string;

  @IsOptional()
  public year: Year;
}
