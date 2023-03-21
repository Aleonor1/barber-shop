import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { BarberServiceImpl } from "./BarberServiceImpl";
import { ClientsService } from "./ClientServiceImpl";
import { ClientSession } from "typeorm";
import { HairdresserService } from "src/Entities/HairdresserService";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";

export class AppointmentServiceImpl {
  constructor(
    @Inject(BarberServiceImpl)
    private readonly barberService: BarberServiceImpl,
    @Inject(AppointmentRepositoryImpl)
    private readonly appointmentRepository: AppointmentRepositoryImpl
  ) {}

  public async getAllBarberAppointments(barberId: string) {
    // return await this.appointmentRepository.getAllBarberAppointmentsOnDay(
    //   barberId
    // );
  }

  public async create(
    from: string,
    to: string,
    month: number,
    clientId: string,
    barberId: string,
    service: string,
    day: number
  ): Promise<Appointment> {
    const appointment = await this.barberService.addAppointment(
      barberId,
      day,
      month,
      from,
      to,
      service,
      clientId
    );

    return appointment;
  }
}
