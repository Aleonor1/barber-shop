import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { BarberServiceImpl } from "./BarberServiceImpl";
import { ClientsService } from "./ClientServiceImpl";
import { ClientSession } from "typeorm";
import { HairdresserService } from "src/Entities/HairdresserService";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { MailSenderService } from "src/EmailConfirmation/MailSenderService";
import { Client } from "src/Entities/Client";

export class AppointmentServiceImpl {
  constructor(
    @Inject(BarberServiceImpl)
    private readonly barberService: BarberServiceImpl // @Inject(AppointmentRepositoryImpl)
  ) // private readonly appointmentRepository: AppointmentRepositoryImpl
  {}

  public async getAllBarberAppointments(barberId: string) {
    return await this.barberService.getAllBarberAppointments(barberId);
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

    if (appointment && appointment.isConfirmed) {
      this.sendEmailConfirmedAppointment(appointment, appointment.client);
    }
    return appointment;
  }

  private async sendEmailConfirmedAppointment(
    appointment: Appointment,
    client: Client
  ) {
    const mailSender = MailSenderService.getInstance();
    await mailSender.sendMailToClientAppointmentConfirmed(
      "aleonornyikita@gmail.com",
      "aleonornyikita@gmail.com",
      appointment,
      client.id
    );
  }
}
