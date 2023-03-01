import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertQueryBuilder, Repository } from "typeorm";
import { Barber } from "./Entities/Barber";
import { ModuleRef } from "@nestjs/core";
import {
  BARBER_SERVICE,
  BarberServiceImpl,
} from "./Services/BarberServiceImpl";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(BARBER_SERVICE)
    private readonly barberService: BarberServiceImpl
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  insertBarber(): void {
    this.barberService.saveBarber(new Barber("123", "florin", "gardos"));
  }
}
