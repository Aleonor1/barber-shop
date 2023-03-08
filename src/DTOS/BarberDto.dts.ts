import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
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
  public email: string;

  @IsString()
  @IsNotEmpty()
  public experience: ExperienceLevel;

  @IsString()
  @IsNotEmpty()
  public addressName: string;
}
