import { Barber } from "src/Entities/Barber";
import { Injectable } from "nestjs-injectable";
import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import exp from "constants";
import { Country } from "src/Utils/Countries";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { UpdateResult } from "typeorm";
import { BarberBuilderImpl } from "src/Builder/BarberBuilderImpl";

Injectable();
export class BarberServiceImpl {
  constructor(
    @Inject(BarberRepositoryImpl)
    private readonly barberRepository: BarberRepositoryImpl,
    @Inject(BasicAddressRepository)
    private readonly basicAddressRepository: BasicAddressRepository
  ) {}

  public async getBarberById(id: string): Promise<Barber> {
    return await this.barberRepository.findById(id);
  }

  async createOrUpdate(
    firstName: string,
    lastName: string,
    age: number,
    nationality: string,
    street: string,
    city: string,
    country: string,
    postalCode: string,
    experience: ExperienceLevel,
    addressName?: string,
    id?: string
  ): Promise<Barber> {
    let oldBarber = null;
    if (id) {
      oldBarber = await this.barberRepository.findById(id);
    }
    let address = await this.basicAddressRepository.handleAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );

    const newBarber = new BarberBuilderImpl()
      .setLastName(lastName)
      .setFirstName(firstName)
      .setAge(age)
      .setAddress(address)
      .setExperience(experience)
      .setNationality(Country[nationality])
      .build();

    return await this.barberRepository.createOrUpdate(newBarber);
  }

  async getAllBarbers(): Promise<[Barber[], number]> {
    return await this.barberRepository.getAllBarbers();
  }

  async updateBarber(id: string, newBarber: Barber): Promise<Barber> {
    return this.barberRepository.update(id, newBarber);
  }

  async deleteBarber(id: string): Promise<UpdateResult> {
    return await this.barberRepository.delete(id);
  }

  async restoreSoftDelete(id: string): Promise<UpdateResult> {
    return await this.barberRepository.restoreSoftDelete(id);
  }
}
