import { Inject, Injectable } from "@nestjs/common";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { Client } from "src/Entities/Client";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";

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
    addressName?: string,
    id?: string
  ) {
    let address = await this.basicAddressRepository.handleAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );

    const newClient = new Client(lastName, firstName, age, address, 0);

    this.clientRepositoryImpl.createOrUpdate(newClient);
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  // update(id: number, updateClientDto: UpdateClientDto) {
  //   return `This action updates a #${id} client`;
  // }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
