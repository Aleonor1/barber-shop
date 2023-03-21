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

  @Get("/:barberId")
  async getAllBarberAppointments(@Param("barberId") barberId: string) {
    try {
      this.appointmentService.getAllBarberAppointments(barberId);
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
