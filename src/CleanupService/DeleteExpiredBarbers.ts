import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Barber } from "src/Entities/Barber";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";
import { Repository } from "typeorm";

@Injectable()
export class DeleteExpiredBarbers {
  constructor(private readonly barberService: BarberServiceImpl) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    console.log("Running service for cleaning expired barbers");
    const expiredBarbers = await this.barberService.getExpiredBarbers();
    console.log(expiredBarbers);
    if (expiredBarbers.length > 0) {
      expiredBarbers.forEach(async (barber) => {
        await this.barberService.deletePermanently(barber.id);
      });
    }
  }
}
