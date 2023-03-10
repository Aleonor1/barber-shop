import { Barber } from "src/Entities/Barber";
import { Injectable } from "nestjs-injectable";
import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import exp from "constants";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { UpdateResult } from "typeorm";
import { BarberBuilderImpl } from "src/Builder/BarberBuilderImpl";
import { CountryRepositoryImpl } from "src/Repositories/CountryRepositoryImpl";
import { Country } from "src/Entities/Country";

Injectable();
export class BarberServiceImpl {
  constructor(
    @Inject(BarberRepositoryImpl)
    private readonly barberRepository: BarberRepositoryImpl,
    @Inject(BasicAddressRepository)
    private readonly basicAddressRepository: BasicAddressRepository,
    @Inject(CountryRepositoryImpl)
    private readonly countryRepositoryImpl: CountryRepositoryImpl
  ) {}

  public async getBarberById(id: string): Promise<Barber> {
    return await this.barberRepository.findById(id);
  }

  async create(
    firstName: string,
    lastName: string,
    age: number,
    nationalities: string[],
    street: string,
    city: string,
    country: string,
    postalCode: string,
    experience: ExperienceLevel,
    email: string,
    addressName?: string,
    id?: string
  ): Promise<Barber> {
    const address = await this.basicAddressRepository.handleAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );

    let countriesFromDb: Country[];

    nationalities.map(
      async (coun) => await this.countryRepositoryImpl.findById(coun)
    );

    const newBarber = new BarberBuilderImpl()
      .setLastName(lastName)
      .setFirstName(firstName)
      .setAge(age)
      .setAddress(address)
      .setExperience(experience)
      .setNationalities(countriesFromDb)
      .setEmail(email)
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
