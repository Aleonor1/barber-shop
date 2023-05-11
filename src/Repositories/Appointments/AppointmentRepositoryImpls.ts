import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "nestjs-injectable";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Repository } from "typeorm";

@Injectable()
export class AppointmentRepositoryImpl {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>
  ) {}

  async getAllAppointments(): Promise<[Appointment[], number]> {
    return this.appointmentRepository
      .createQueryBuilder("appointment")
      .select("appointment")
      .getManyAndCount();
  }

  async getAppointmentById(appointmentId: string): Promise<Appointment> {
    return this.appointmentRepository
      .createQueryBuilder("appointment")
      .select("appointment")
      .leftJoinAndSelect("appointment.client", "client")
      .leftJoinAndSelect("appointment.service", "service")
      .where("appointment.id = :appointmentId", {
        appointmentId,
      })
      .getOne();
  }

  async getAllBarberAppointmentsOnDay(
    day: number
  ): Promise<[Appointment[], number]> {
    return this.appointmentRepository
      .createQueryBuilder("appointment")
      .select("appointment")
      .where("appointment.day = :day", {
        day,
      })
      .getManyAndCount();
  }

  async getAllClientAppointmnts(id: string): Promise<Appointment[]> {
    return await this.appointmentRepository
      .createQueryBuilder("appointment")
      .select("appointment")
      .leftJoinAndSelect("appointment.client", "client")
      .leftJoinAndSelect("appointment.day", "day")
      .leftJoinAndSelect("day.month", "month")
      .leftJoinAndSelect("month.year", "year")
      .leftJoinAndSelect("appointment.service", "service")
      // .leftJoinAndSelect("year.barber", "barber")
      .where("client.id = :id", { id })
      .andWhere("appointment.status != :status", { status: "cancelled" })
      .getMany();
  }

  async createOrUpdate(appointment: Appointment): Promise<Appointment> {
    await this.appointmentRepository.save(appointment);
    return this.getAppointmentById(appointment.id);
  }
}
