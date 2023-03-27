import { PartialType } from "@nestjs/mapped-types";
import { BarberDto } from "./BarberDto.dts";

export class UpdateBarberDto extends PartialType(BarberDto) {}
