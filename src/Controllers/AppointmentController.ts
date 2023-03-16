import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from "@nestjs/common";
import { AppointmentDto } from "src/DTOS/AppointmentDto.dts";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentServiceImpl } from "src/Services/AppointmentServiceImpl";
import { BarberNotFoundError } from "src/Utils/CustomErrors/BarberNotFoundError";
import { ClientNotFoundError } from "src/Utils/CustomErrors/ClientNotFoundError";
import { Response } from "express";

@Controller("appointment")
export class AppointmentController {
  constructor(
    @Inject(AppointmentServiceImpl)
    private readonly appointmentService: AppointmentServiceImpl
  ) {}

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
