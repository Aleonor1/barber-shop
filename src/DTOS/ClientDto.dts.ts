import { Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
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
  public fidelity: number;

  @IsString()
  @IsNotEmpty()
  public addressName: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => Country)
  public nationalities: Country[];
}
