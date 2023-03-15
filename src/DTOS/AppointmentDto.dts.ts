import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";
import { HairdresserService } from "src/Entities/HairdresserService";

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
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsNumber()
  day: number;
}
