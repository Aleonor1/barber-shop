import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { first } from "rxjs";
import { BarberDto } from "src/DTOS/BarberDto.dts";
import { Barber } from "src/Entities/Barber";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";

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
  async getBarberById(@Param("id") id: string): Promise<Barber> {
    const barber = await this.barberService.getBarberById(id);
    if (barber) {
      return barber;
    } else {
      throw new Error("Barber not found");
    }
  }

  @Post("/")
  insertBarber(@Body() body: BarberDto): void {
    this.barberService.create(
      body.firstName,
      body.lastName,
      body.age,
      body.nationalities,
      body.street,
      body.city,
      body.country,
      body.postalCode,
      body.experience,
      body.email,
      body.username,
      body.password,
      body.addressName
    );
  }

  @Patch("/:id")
  update(@Param("id") id: string, newBarber: Barber) {
    this.barberService.updateBarber(id, newBarber);
  }

  @Delete("/:id")
  deleteBarber(@Param("id") id: string): void {
    this.barberService.deleteBarber(id);
  }

  @Patch("/restore/:id")
  restoreSoftDelete(@Param("id") id: string): void {
    this.barberService.restoreSoftDelete(id);
  }
}
