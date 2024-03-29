import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./Entities/User";
import { Barber } from "./Entities/Barber";
import { Client } from "./Entities/Client";
import { BarberModule } from "./Modules/BarberModule";
import { BasicAddress } from "./Utils/Address";
import { ClientsModule } from "./Modules/ClientModule";
import { Country } from "./Entities/Country";
import { CountryRepositoryImpl } from "./Repositories/CountryRepositoryImpl";
import { CountryModule } from "./Modules/CountryModule";
import { Appointment } from "./Entities/Appointments/Appointment";
import { Calendar } from "./Entities/Appointments/Calendar";
import { Day } from "./Entities/Appointments/Day";
import { Month } from "./Entities/Appointments/Month";
import { Year } from "./Entities/Appointments/Year";
import { AppointmentModule } from "./Modules/AppointmentModule";
import { HairdresserService } from "./Entities/HairdresserService";
import { HairdresserServicesRepositoryImpl } from "./Repositories/HairdresserServicesRepositoryImpl";
import { ScheduleModule } from "@nestjs/schedule";
import { Vacation } from "./Entities/Vacation";

@Module({
  imports: [
    BarberModule,
    AppointmentModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Country, HairdresserService]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "",
      database: "",
      entities: [
        User,
        Barber,
        Client,
        BasicAddress,
        Country,
        Appointment,
        Day,
        Month,
        HairdresserService,
        Year,
        Vacation,
      ],
      synchronize: true,
      logging: true,
    }),
    ClientsModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CountryRepositoryImpl,
    HairdresserServicesRepositoryImpl,
  ],
})
export class AppModule {}
