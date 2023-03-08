import { Inject, Injectable } from "@nestjs/common";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { Client } from "src/Entities/Client";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { Country } from "src/Entities/Country";
import { UpdateResult } from "typeorm";
import { emitWarning } from "process";

@Injectable()
export class ClientsService {
  constructor(
    @Inject(ClientRepositoryImpl)
    private readonly clientRepositoryImpl: ClientRepositoryImpl,
    @Inject(BasicAddressRepository)
    private readonly basicAddressRepository: BasicAddressRepository
  ) {}

  async create(
    firstName: string,
    lastName: string,
    age: number,
    street: string,
    city: string,
    country: string,
    postalCode: string,
    addressName: string,
    email: string,
    nationalities: Country[]
  ) {
    let address = await this.basicAddressRepository.handleAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );

    const newClient = new Client(
      lastName,
      firstName,
      age,
      address,
      email,
      nationalities,
      0
    );

    this.clientRepositoryImpl.createOrUpdate(newClient);
  }

  findAll() {
    return this.clientRepositoryImpl.getAllClients();
  }

  findOne(id: string) {
    return this.clientRepositoryImpl.findById(id);
  }

  async deleteBarber(id: string): Promise<UpdateResult> {
    return await this.clientRepositoryImpl.delete(id);
  }

  async restoreSoftDelete(id: string): Promise<UpdateResult> {
    return await this.clientRepositoryImpl.restoreSoftDelete(id);
  }
}
