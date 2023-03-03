import { Barber } from "src/Entities/Barber";
import { Injectable } from "nestjs-injectable";
import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import exp from "constants";
import { Country } from "src/Utils/Countries";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";

Injectable();
export class BarberServiceImpl {
  constructor(
    @Inject(BarberRepositoryImpl)
    private readonly barberRepository: BarberRepositoryImpl,
    @Inject(BasicAddressRepository)
    private readonly basicAddressRepository: BasicAddressRepository
  ) {}

  async getBarberById(id: string): Promise<Barber> {
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
    addressName?: string
  ): Promise<Barber> {
    let address = await this.handleAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );

    const newBarber = new Barber(
      lastName,
      firstName,
      age,
      address,
      experience,
      Country[nationality]
    );

    return await this.barberRepository.createOrUpdate(newBarber);
  }

  private async handleAddress(
    addressName: string,
    city: string,
    country: string,
    street: string,
    postalCode: string
  ) {
    let address = await this.basicAddressRepository.findAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );

    if (!address) {
      await this.basicAddressRepository.createAddress(
        addressName,
        city,
        country,
        street,
        postalCode
      );
    }

    address = await this.basicAddressRepository.findAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );
    return address;
  }

  async getAllBarbers(): Promise<[Barber[], number]> {
    return await this.barberRepository.getAllBarbers();
  }
}
