import { Barber } from "src/Entities/Barber";
import { BarberService } from "./BarberService";
import { Injectable } from "nestjs-injectable";
import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { BARBER_REPOSITORY } from "src/Repositories/BarberRepository";

export const BARBER_SERVICE = "BARBER-SERVICE-IMPL";

Injectable();
export class BarberServiceImpl implements BarberService {
  constructor(
    @Inject(BARBER_REPOSITORY)
    private readonly barberRepository: BarberRepositoryImpl
  ) {}

  getBarberById(id: string): Promise<Barber> {
    return this.barberRepository.findById(id);
  }

  async saveBarber(barber: Barber): Promise<void> {
    console.log(barber);
    await this.barberRepository.saveBarber(barber);
  }
}
