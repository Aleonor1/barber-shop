import { FidelityLevel } from "@/Utils/FidelityLevel";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginClientDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export default LoginClientDto;
