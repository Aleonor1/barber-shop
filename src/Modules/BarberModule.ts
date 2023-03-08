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

@Module({
  imports: [
    TypeOrmModule.forFeature([Barber]),
    TypeOrmModule.forFeature([BasicAddress]),
    TypeOrmModule.forFeature([Country]),
  ],
  controllers: [BarberController],
  providers: [
    BarberServiceImpl,
    BarberRepositoryImpl,
    BasicAddressRepository,
    CountryRepositoryImpl,
  ],
})
export class BarberModule {}
