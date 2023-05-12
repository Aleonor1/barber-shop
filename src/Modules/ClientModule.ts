import { Module } from "@nestjs/common";
import { ClientsService } from "../Services/ClientServiceImpl";
import { ClientsController } from "../Controllers/ClientController";
import { Client } from "src/Entities/Client";
import { BasicAddress } from "src/Utils/Address";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentModule } from "./AppointmentModule";
import { Barber } from "src/Entities/Barber";
import { ScheduleModule } from "@nestjs/schedule";
import { DeleteExpiredClients } from "src/CleanupService/DeleteExpiredClients";

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([BasicAddress]),
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([Barber]),
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
    BarberRepositoryImpl,
  ],
})
export class ClientsModule {}
