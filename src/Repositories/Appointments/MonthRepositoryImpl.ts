import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "nestjs-injectable";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Day } from "src/Entities/Appointments/Day";
import { Month } from "src/Entities/Appointments/Month";
import { Repository } from "typeorm";

@Injectable()
export class MonthRepositoryImpl {
  constructor(
    @InjectRepository(Month)
    private readonly monthRepositoryImpl: Repository<Month>
  ) {}

  async getAllDays(): Promise<[Month[], number]> {
    return this.monthRepositoryImpl
      .createQueryBuilder("month")
      .select("month")
      .getManyAndCount();
  }

  async createOrUpdate(month: Month): Promise<void> {
    await this.monthRepositoryImpl.save(month);
  }
}
