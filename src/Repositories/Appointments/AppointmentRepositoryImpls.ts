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

  async createOrUpdate(appointment: Appointment): Promise<void> {
    await this.appointmentRepository.save(appointment);
  }
}
