import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { first } from "rxjs";
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
  getBarberById(@Param("id") id): Promise<Barber> {
    return this.barberService.getBarberById(id);
  }

  @Post("/create")
  insertBarber(
    @Param("lastName") lastName,
    @Param("firstName") firstName,
    @Param("age") age,
    @Param("street") street,
    @Param("city") city,
    @Param("country") country,
    @Param("postalCo") postalCode,
    @Param("experience") experience,
    @Param("addressName") addressName
  ): void {
    const nationality = Country[country];
    this.barberService.createOrUpdate(
      firstName,
      lastName,
      age,
      nationality,
      street,
      city,
      country,
      postalCode,
      experience,
      addressName
    );
  }
}
