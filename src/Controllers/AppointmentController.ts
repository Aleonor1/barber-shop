import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AppointmentDto } from "src/DTOS/AppointmentDto.dts";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentServiceImpl } from "src/Services/AppointmentServiceImpl";

@Controller("appointment")
export class AppointmentController {
  constructor(
    @Inject(AppointmentServiceImpl)
    private readonly appointmentService: AppointmentServiceImpl
  ) {}

  @Post("/")
  insertBarber(@Body() body: AppointmentDto): void {
    this.appointmentService.create(
      body.from,
      body.to,
      body.month,
      body.clientId,
      body.barberId,
      body.service,
      body.day
    );
  }
}
