import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./Entities/User";
import { Barber } from "./Entities/Barber";
import { Client } from "./Entities/Client";
import { BarberRepositoryImpl } from "./Repositories/BarberRepositoryImpl";
import {
  BARBER_SERVICE,
  BarberServiceImpl,
} from "./Services/BarberServiceImpl";
import { BARBER_REPOSITORY } from "./Repositories/BarberRepository";

@Module({
  imports: [
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
  providers: [
    { useClass: BarberRepositoryImpl, provide: BARBER_REPOSITORY },
    AppService,
  ],
})
export class AppModule {}
