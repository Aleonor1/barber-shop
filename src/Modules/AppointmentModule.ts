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

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([Barber]),
    TypeOrmModule.forFeature([BasicAddress]),
    TypeOrmModule.forFeature([Country]),
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentServiceImpl,
    BarberServiceImpl,
    BarberRepositoryImpl,
    BasicAddressRepository,
    CountryRepositoryImpl,
  ],
})
export class AppointmentModule {}
