import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { BarberServiceImpl } from "./BarberServiceImpl";
import { ClientsService } from "./ClientServiceImpl";
import { ClientSession } from "typeorm";
import { BarberService } from "src/Entities/BarberService";
import { Appointment } from "src/Entities/Appointments/Appointment";

export class AppointmentServiceImpl {
  constructor(
    @Inject(BarberServiceImpl)
    private readonly barberService: BarberServiceImpl
  ) {}

  public create(
    from: string,
    to: string,
    month: number,
    clientId: string,
    barberId: string,
    service: BarberService,
    day: number
  ): void {
    this.barberService.addAppointment(
      barberId,
      day,
      month,
      from,
      to,
      service,
      clientId
    );
  }
}
