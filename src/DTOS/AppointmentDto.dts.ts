import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";
import { BarberService } from "src/Entities/BarberService";

export class AppointmentDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsNumber()
  month: number;

  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  barberId: string;

  @IsNotEmpty()
  service: BarberService;

  @IsNotEmpty()
  @IsNumber()
  day: number;
}
