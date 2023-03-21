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

  async getAllBarberAppointments(
    barberId: string
  ): Promise<[Appointment[], number]> {
    return this.appointmentRepository
      .createQueryBuilder("appointment")
      .select("appointment")
      .leftJoinAndSelect("appointment.barber", "barber")
      .where("barber.id = :barberId", {
        barberId,
      })
      .getManyAndCount();
  }

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
      .where("appointment.id = :id", {
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

  async createOrUpdate(appointment: Appointment): Promise<void> {
    await this.appointmentRepository.save(appointment);
  }
}
