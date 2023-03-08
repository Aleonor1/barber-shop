import { Module } from "@nestjs/common";
import { ClientsService } from "../Services/ClientServiceImpl";
import { ClientsController } from "../Controllers/ClientController";
import { Client } from "src/Entities/Client";
import { BasicAddress } from "src/Utils/Address";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([BasicAddress]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientRepositoryImpl, BasicAddressRepository],
})
export class ClientsModule {}
