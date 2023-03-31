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
import { AppointmentStatus } from "@/Utils/AppointmentStatus";
import { ExperienceLevel } from "@/Utils/ExperienceLevel";

export class AppointmentServiceImpl {
  constructor(
    @Inject(BarberServiceImpl)
    private readonly barberService: BarberServiceImpl,
    @Inject(AppointmentRepositoryImpl)
    private readonly appointmentRepository: AppointmentRepositoryImpl
  ) {}

  public async getAllBarberAppointments(barberId: string) {
    return await this.barberService.getAllBarberAppointments(barberId);
  }

  public async getAppointmentById(id: string) {
    return await this.appointmentRepository.getAppointmentById(id);
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

  //TODO FINISH
  // async cancelAppointment(id: string): Promise<Appointment> {
  //   const appointment = await this.appointmentRepository.getAppointmentById(id);
  //   if (!appointment) {
  //     throw new Error(`Appointment with id ${id} not found.`);
  //   }
  //   appointment.isCancelled = true;
  //   return this.appointmentRepository.createOrUpdate(appointment);
  // }

  async completeAppointment(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.getAppointmentById(id);
    if (!appointment) {
      throw new Error(`Appointment with id ${id} not found.`);
    }
    appointment.complete();
    // return
    this.appointmentRepository.createOrUpdate(appointment);
    return null;
  }

  async findAppointmentById(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.getAppointmentById(id);
    if (!appointment) {
      throw new Error(`Appointment with id ${id} not found.`);
    }
    return appointment;
  }

  public async getAllBarberAppointmentsOnSpecificDate(
    barberId: string,
    monthNumber: number,
    dayNumber: number
  ) {
    return await this.barberService.getAllBarberAppointmentsOnSpecificDate(
      barberId,
      monthNumber,
      dayNumber
    );
  }
}
