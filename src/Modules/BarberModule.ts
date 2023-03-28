import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BarberController } from "src/Controllers/BarberController";
import { Barber } from "src/Entities/Barber";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";
import { BasicAddress } from "src/Utils/Address";
import { CountryRepositoryImpl } from "src/Repositories/CountryRepositoryImpl";
import { Country } from "src/Entities/Country";
import { ClientsService } from "src/Services/ClientServiceImpl";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { Client } from "src/Entities/Client";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { HairdresserServicesRepositoryImpl } from "src/Repositories/HairdresserServicesRepositoryImpl";
import { HairdresserService } from "src/Entities/HairdresserService";
import { AppointmentModule } from "./AppointmentModule";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ScheduleModule } from "@nestjs/schedule";
import { DeleteExpiredBarbers } from "src/CleanupService/DeleteExpiredBarbers";

@Module({
  imports: [
    TypeOrmModule.forFeature([Barber]),
    TypeOrmModule.forFeature([BasicAddress]),
    TypeOrmModule.forFeature([Country]),
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([HairdresserService]),
    SwaggerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [BarberController],
  providers: [
    DeleteExpiredBarbers,
    BarberServiceImpl,
    BarberRepositoryImpl,
    BasicAddressRepository,
    CountryRepositoryImpl,
    ClientsService,
    ClientRepositoryImpl,
    HairdresserServicesRepositoryImpl,
    AppointmentRepositoryImpl,
  ],
})
export class BarberModule {}
