import { Controller, Get, Inject, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { BarberServiceImpl } from "./Services/BarberServiceImpl";
import { Country } from "./Utils/Countries";
import { Barber } from "./Entities/Barber";
import { BarberController } from "./Controllers/BarberController";
import { last } from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
