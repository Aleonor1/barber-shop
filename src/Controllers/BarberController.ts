import { Controller, Get, Inject, Post } from "@nestjs/common";
import { Barber } from "src/Entities/Barber";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";
import { Country } from "src/Utils/Countries";

@Controller("barber")
export class BarberController {
  constructor(
    @Inject(BarberServiceImpl)
    private readonly barberService: BarberServiceImpl
  ) {}
  @Get("/")
  async getAllBarbers(): Promise<[Barber[], number]> {
    return await this.barberService.getAllBarbers();
  }

  @Get("/:id")
  getBarberById(): Promise<Barber> {
    return this.barberService.getBarberById("asd");
  }

  @Post("/create")
  createOrUpdate(barber: Barber): void {
    this.barberService.createOrUpdate(
      new Barber("Rusu", "Roxana", 18, Country.Romania)
    );
  }
}
