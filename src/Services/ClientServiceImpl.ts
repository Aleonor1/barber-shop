import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "../Entities/dto/create-client.dto";
import { UpdateClientDto } from "../Entities/dto/update-client.dto";

@Injectable()
export class ClientsService {
  constructor(
    @Inject(ClientRepositoryImpl)
    private readonly clientRepositoryImpl: BarberRepositoryImpl,
    @Inject(BasicAddressRepository)
    private readonly basicAddressRepository: BasicAddressRepository
  ) {}
  create(
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
  ) {
    return "This action adds a new client";
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
