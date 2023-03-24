import { IsNotEmpty, IsNumber } from "class-validator";

export class DayAndMonthQueryParams {
  @IsNotEmpty()
  public month: number;
  @IsNotEmpty()
  public day: number;
}
