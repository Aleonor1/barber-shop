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

@Module({
  imports: [
    BarberModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "",
      database: "",
      entities: [User, Barber, Client, BasicAddress],
      synchronize: true,
      logging: true,
    }),
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
