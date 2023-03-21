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
import { AppointmentController } from "src/Controllers/AppointmentController";
import { ClientsService } from "src/Services/ClientServiceImpl";
import { AppointmentServiceImpl } from "src/Services/AppointmentServiceImpl";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { Client } from "src/Entities/Client";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { HairdresserServicesRepositoryImpl } from "src/Repositories/HairdresserServicesRepositoryImpl";
import { HairdresserService } from "src/Entities/HairdresserService";

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([Barber]),
    TypeOrmModule.forFeature([BasicAddress]),
    TypeOrmModule.forFeature([Country]),
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([HairdresserService]),
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentRepositoryImpl,
    AppointmentServiceImpl,
    BarberServiceImpl,
    BarberRepositoryImpl,
    BasicAddressRepository,
    ClientsService,
    ClientRepositoryImpl,
    CountryRepositoryImpl,
    HairdresserServicesRepositoryImpl,
  ],
})
export class AppointmentModule {}
