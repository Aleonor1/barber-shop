import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BarberController } from "src/Controllers/BarberController";
import { Barber } from "src/Entities/Barber";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";
import { Repository } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Barber])],
  controllers: [BarberController],
  providers: [BarberServiceImpl, BarberRepositoryImpl],
})
export class BarberModule {}
