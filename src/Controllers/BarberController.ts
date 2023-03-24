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
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response, query, response } from "express";
import { BarberDto } from "src/DTOS/BarberDto.dts";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Barber } from "src/Entities/Barber";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";
import { DayAndMonthQueryParams } from "src/Utils/QueryParams/DayAndMonthQueryParam";
import { OptionalDayAndMonthQueryParams } from "src/Utils/QueryParams/OptionalDayAndMonthQueryParam";

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
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Get("verifyAppointment/:barberId/:appointmnetId")
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
  async getAllBarberAppointments(
    @Param("id") id: string,
    @Res() response: Response,
    @Query() query: OptionalDayAndMonthQueryParams
  ) {
    try {
      let appointments;
      if (query && query.month && query.day) {
        const [month, day] = [query.month - 1, query.day];
        appointments =
          await this.barberService.getAllBarberAppointmentsOnSpecificDate(
            id,
            month,
            day
          );
      } else {
        appointments = await this.barberService.getAllBarberAppointments(id);
      }

      response.status(HttpStatus.OK).json(appointments).send();
      return appointments;
    } catch (exception) {
      response.status(HttpStatus.OK).json(exception.message).send();
    }
  }

  @Get("/:id/freeAppointmentsOnDay")
  async getEmptyAppointmentsFromBarber(
    @Param("id") id: string,
    @Res() response: Response,
    @Query() query: DayAndMonthQueryParams
  ): Promise<Appointment[]> {
    const [month, day] = [query.month - 1, query.day];
    try {
      const appointments =
        await this.barberService.getAllBarberFreeAppointmentsOnSpecificDate(
          id,
          month,
          day
        );

      response.status(HttpStatus.OK).json(appointments).send();
      return appointments;
    } catch (exception) {
      response.status(HttpStatus.OK).json(exception.message).send();
    }
  }
}
