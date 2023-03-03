import { Controller, Get, Inject, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertQueryBuilder, Repository } from "typeorm";
import { Barber } from "./Entities/Barber";
import { ModuleRef } from "@nestjs/core";
import {
  BARBER_SERVICE,
  BarberServiceImpl,
} from "./Services/BarberServiceImpl";
import { Agent } from "http";
import { Country } from "./Utils/Countries";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(BARBER_SERVICE) private readonly barberService: BarberServiceImpl
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  insertBarber(
    lastName: string,
    firstName: string,
    age: number,
    nationality: string
  ): void {
    const country = Country[nationality];
    // this.barberService.createOrUpdate(
    //   new Barber(firstName, lastName, age, country)
    // );
  }
}
