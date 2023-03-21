import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { Response, response } from "express";
import { first } from "rxjs";
import { BarberDto } from "src/DTOS/BarberDto.dts";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Barber } from "src/Entities/Barber";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";

@Controller("barber")
export class BarberController {
  constructor(
    @Inject(BarberServiceImpl)
    private readonly barberService: BarberServiceImpl
  ) {}
  @Get("/")
  async getAllBarbers(@Res() response: Response): Promise<[Barber[], number]> {
    try {
      const barbers = await this.barberService.getAllBarbers();
      if (barbers) {
        response.status(HttpStatus.OK).json(barbers).send();
        return barbers;
      } else {
        response.status(HttpStatus.NO_CONTENT).json().send();
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json().send();
    }
  }

  @Get("/:id")
  async getBarberById(
    @Param("id") id: string,
    @Res() response: Response
  ): Promise<Barber> {
    try {
      const barber = await this.barberService.getBarberById(id);
      if (barber) {
        response.status(HttpStatus.OK).json(barber).send();
        return barber;
      } else {
        response.status(HttpStatus.OK).json().send();
      }
    } catch (exception) {}
  }

  @Get("verifyAppointment/:barberId/:appointmentId")
  async verifyAppointment(
    @Param("barberId") barberId: string,
    @Param("appointmnetId") appointmentId: string,
    @Res() response: Response
  ): Promise<Appointment> {
    try {
      const appointment = await this.barberService.verifyAppointment(
        barberId,
        appointmentId
      );
      response.status(HttpStatus.OK).json(appointment).send();
      return appointment;
    } catch (exception) {
      response.status(HttpStatus.OK).json(exception.message).send();
    }
  }

  @Post("/")
  async insertBarber(
    @Body() body: BarberDto,
    @Res() response: Response
  ): Promise<void> {
    try {
      const barber = await this.barberService.create(
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

      response.status(HttpStatus.CREATED).json(barber).send();
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Patch("/:id")
  update(
    @Param("id") id: string,
    newBarber: Barber,
    @Res() response: Response
  ): void {
    try {
      const barber = this.barberService.updateBarber(id, newBarber);
      response.status(HttpStatus.OK).json(barber).send();
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Delete("/:id")
  deleteBarber(@Param("id") id: string, @Res() response: Response): void {
    try {
      const barber = this.barberService.deleteBarber(id);
      response.status(HttpStatus.OK).json(barber).send();
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Patch("/restore/:id")
  restoreSoftDelete(@Param("id") id: string, @Res() response: Response): void {
    try {
      const barber = this.barberService.restoreSoftDelete(id);
      response.status(HttpStatus.OK).json(barber).send();
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Get("/:id/allAppointments")
  getAllBarberAppointments(
    @Param("barberId") barberId: string,
    @Res() response: Response
  ) {
    const appointments = this.barberService.getAllBarberAppointments(barberId);

    response.status(HttpStatus.OK).json(appointments).send();
  }
}
