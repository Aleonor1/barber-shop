import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./Entities/User";
import { Barber } from "./Entities/Barber";
import { Client } from "./Entities/Client";
import { BarberController } from "./Controllers/BarberController";
import { BarberModule } from "./Modules/BarberModule";
import { BarberServiceImpl } from "./Services/BarberServiceImpl";

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
      entities: [User, Barber, Client],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
