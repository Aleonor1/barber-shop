import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class OptionalDayAndMonthQueryParams {
  @IsOptional()
  public month: number;
  @IsOptional()
  public day: number;
}
