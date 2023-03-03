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
  insertBarber(@Body() body): void {
    this.barberService.createOrUpdate(
      body.firstName,
      body.lastName,
      body.age,
      body.nationality,
      body.street,
      body.city,
      body.country,
      body.postalCode,
      body.experience,
      body.addressName
    );
  }
}
