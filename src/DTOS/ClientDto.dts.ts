import { Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { Country } from "src/Entities/Country";

export class CleintDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsNumber()
  @IsOptional()
  fidelityLevel: number;

  @IsOptional()
  public status: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

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

  @IsString()
  @IsNotEmpty()
  public postalCode: string;

  @IsString()
  @IsNotEmpty()
  public addressName: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsDefined()
  @Type(() => Country)
  public nationalities: Country[];
}
