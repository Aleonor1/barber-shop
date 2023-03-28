import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Barber } from "src/Entities/Barber";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";
import { ClientsService } from "src/Services/ClientServiceImpl";
import { Repository } from "typeorm";

@Injectable()
export class DeleteExpiredClients {
  constructor(private readonly clientService: ClientsService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    console.log("Running service for cleaning expired clients");
    const expiredClients = await this.clientService.getExpiredClients();
    if (expiredClients.length > 0) {
      expiredClients.forEach(async (barber) => {
        await this.clientService.deletePermanently(barber.id);
      });
    }
  }
}
