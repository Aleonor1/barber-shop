import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { AppointmentDto } from "src/DTOS/AppointmentDto.dts";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentServiceImpl } from "src/Services/AppointmentServiceImpl";
import { Response } from "express";
import { BarberNotFoundError } from "src/Utils/CustomErrors/BarberNotFoundError";
import { ClientNotFoundError } from "src/Utils/CustomErrors/ClientNotFoundError";

@Controller("appointment")
export class AppointmentController {
  constructor(
    @Inject(AppointmentServiceImpl)
    private readonly appointmentService: AppointmentServiceImpl
  ) {}

  @Get("/:id")
  async getAppointmentById(
    @Param("id") id: string,
    @Res() response: Response
  ): Promise<Appointment> {
    try {
      const appointment = await this.appointmentService.getAppointmentById(id);
      if (appointment) {
        response.status(HttpStatus.OK).json(appointment).send();
      } else {
        response.status(HttpStatus.NOT_FOUND).json().send();
      }
      return appointment;
    } catch (exception) {
      console.log(exception);
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Get("/getAppointmentByBarber/:barberId")
  async getAllBarberAppointments(
    @Param("barberId") barberId: string,
    @Res() response: Response
  ) {
    try {
      const appointments =
        await this.appointmentService.getAllBarberAppointments(barberId);
      if (appointments) {
        response.status(HttpStatus.OK).json(appointments).send();
      } else {
        response.status(HttpStatus.NOT_FOUND).json().send();
      }
    } catch (exception) {
      console.log(exception);
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Get("/:barberId")
  async getAllBarberAppointmentsOnDay(
    @Param("barberId") barberId: string,
    @Param("monthNumber") monthNumber: number,
    @Param("dayNumber") dayNumber: number,
    @Res() response: Response
  ) {
    try {
      const appointments =
        this.appointmentService.getAllBarberAppointmentsOnSpecificDate(
          barberId,
          monthNumber,
          dayNumber
        );
      if (appointments) {
        response.status(HttpStatus.OK).json(appointments).send();
      } else {
        response.status(HttpStatus.NOT_FOUND).json().send();
      }
    } catch (exception) {
      console.log(exception);
    }
  }

  @Post("/")
  async createAppointment(
    @Body() body: AppointmentDto,
    @Res() response: Response
  ): Promise<void> {
    try {
      await this.appointmentService.create(
        body.from,
        body.to,
        body.month,
        body.clientId,
        body.barberId,
        body.service,
        body.day
      );
      return;
    } catch (exception) {
      console.log(exception);
      if (
        exception instanceof BarberNotFoundError ||
        exception instanceof ClientNotFoundError
      ) {
        response.status(HttpStatus.NOT_FOUND).json(exception.message).send();
      } else {
        response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
      }
    }
  }
}
