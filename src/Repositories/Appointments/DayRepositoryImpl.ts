import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "nestjs-injectable";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Day } from "src/Entities/Appointments/Day";
import { Repository } from "typeorm";

@Injectable()
export class DayRepositoryImpl {
  constructor(
    @InjectRepository(Day)
    private readonly dayRepositoryImpl: Repository<Day>
  ) {}

  async getAllDays(): Promise<[Day[], number]> {
    return this.dayRepositoryImpl
      .createQueryBuilder("day")
      .select("day")
      .getManyAndCount();
  }

  async createOrUpdate(day: Day): Promise<void> {
    await this.dayRepositoryImpl.save(day);
  }
}
