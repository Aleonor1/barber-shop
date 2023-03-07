import { Module } from "@nestjs/common";
import { ClientsService } from "../Services/ClientServiceImpl";
import { ClientsController } from "../Controllers/ClientController";

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
