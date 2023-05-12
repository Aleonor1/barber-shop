import {
  IsNotEmpty,
  IsNumber,
  IsString,
  isString,
  IsDate,
} from "class-validator";
import { HairdresserService } from "src/Entities/HairdresserService";

export class AppointmentDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  barberId: string;

  @IsNotEmpty()
  @IsString()
  service: string;
}
