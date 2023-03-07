import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./Entities/User";
import { Barber } from "./Entities/Barber";
import { Client } from "./Entities/Client";
import { BarberModule } from "./Modules/BarberModule";
import { BarberController } from "./Controllers/BarberController";
import { BasicAddress } from "./Utils/Address";
import { UsersModule } from "./users/users.module";
import { ClientsModule } from "./Modules/clients.module";

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
    UsersModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
