import { Module } from "@nestjs/common";
import { ClientsService } from "../Services/ClientServiceImpl";
import { ClientsController } from "../Controllers/ClientController";
import { Client } from "src/Entities/Client";
import { BasicAddress } from "src/Utils/Address";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentModule } from "./AppointmentModule";
import { ScheduleModule } from "@nestjs/schedule";
import { DeleteExpiredClients } from "src/CleanupService/DeleteExpiredClients";

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([BasicAddress]),
    TypeOrmModule.forFeature([Appointment]),
    AppointmentModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    DeleteExpiredClients,
    ClientRepositoryImpl,
    BasicAddressRepository,
    AppointmentRepositoryImpl,
  ],
})
export class ClientsModule {}
