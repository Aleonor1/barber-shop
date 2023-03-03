import { Controller, Get, Inject, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { BarberServiceImpl } from "./Services/BarberServiceImpl";
import { Country } from "./Utils/Countries";
import { Barber } from "./Entities/Barber";
import { BarberController } from "./Controllers/BarberController";
import { last } from "rxjs";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(BarberController)
    private readonly barberController: BarberController
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
    this.barberController.createOrUpdate(
      new Barber(lastName, firstName, age, country)
    );
  }
}
