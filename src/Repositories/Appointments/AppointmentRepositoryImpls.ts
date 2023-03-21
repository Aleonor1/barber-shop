import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "nestjs-injectable";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Client } from "src/Entities/Client";
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
      .where("client.id = :id", {
        id,
      })
      .getMany();
  }

  async createOrUpdate(appointment: Appointment): Promise<void> {
    await this.appointmentRepository.save(appointment);
  }
}
