import { Module } from "@nestjs/common";
import { ClientsService } from "../Services/ClientServiceImpl";
import { ClientsController } from "../Controllers/ClientController";
import { Client } from "src/Entities/Client";
import { BasicAddress } from "src/Utils/Address";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { Country } from "src/Entities/Country";
import { CountryRepositoryImpl } from "src/Repositories/CountryRepositoryImpl";

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountryRepositoryImpl],
})
export class CountryModule {}
