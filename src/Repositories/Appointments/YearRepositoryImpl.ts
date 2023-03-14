import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "nestjs-injectable";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Day } from "src/Entities/Appointments/Day";
import { Month } from "src/Entities/Appointments/Month";
import { Year } from "src/Entities/Appointments/Year";
import { Repository } from "typeorm";

@Injectable()
export class YearRepositoryImpl {
  constructor(
    @InjectRepository(Year)
    private readonly yearRepositoryImpl: Repository<Year>
  ) {}

  async getAllDays(): Promise<[Year[], number]> {
    return this.yearRepositoryImpl
      .createQueryBuilder("year")
      .select("year")
      .getManyAndCount();
  }

  async createOrUpdate(year: Year): Promise<void> {
    await this.yearRepositoryImpl.save(year);
  }
}
