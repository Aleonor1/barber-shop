import { Barber } from "src/Entities/Barber";
import { Injectable } from "nestjs-injectable";
import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";

Injectable();
export class BarberServiceImpl {
  constructor(
    @Inject(BarberRepositoryImpl)
    private readonly barberRepository: BarberRepositoryImpl
  ) {}

  async getBarberById(id: string): Promise<Barber> {
    return await this.barberRepository.findById(id);
  }

  async createOrUpdate(barber: Barber): Promise<void> {
    await this.barberRepository.createOrUpdate(barber);
  }

  async getAllBarbers(): Promise<[Barber[], number]> {
    return await this.barberRepository.getAllBarbers();
  }
}
