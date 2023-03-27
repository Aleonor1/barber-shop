import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Barber } from "src/Entities/Barber";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { Repository } from "typeorm";

@Injectable()
export class BarberCleanupService {
  constructor(
    @Inject()
    private readonly barberRepository: BarberRepositoryImpl
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredBarbers() {
    const expiredBarbers = await this.barberRepository.getExpiredBarbers();

    if (expiredBarbers.length > 0) {
      expiredBarbers.forEach((barber) => {
        this.barberRepository.deletePermanently(barber.id);
      });
    }
  }
}
