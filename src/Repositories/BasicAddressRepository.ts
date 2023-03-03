import { BasicAddress } from "src/Utils/Address";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "nestjs-injectable";

@Injectable()
export class BasicAddressRepository {
  constructor(
    @InjectRepository(BasicAddress)
    private readonly addressRepository: Repository<BasicAddress>
  ) {}

  async findAddress(
    name: string,
    city: string,
    country: string,
    postalCode: string,
    street: string
  ): Promise<BasicAddress> {
    return this.addressRepository
      .createQueryBuilder()
      .select([
        "address.addressId",
        "address.name",
        "address.city",
        "address.country",
        "address.postalCode",
        "address.street",
      ])
      .where("address.name = :name", {
        name,
      })
      .andWhere("address.city = :city", {
        city,
      })
      .andWhere("address.country = :country", { country })
      .andWhere("address.postalCode", { postalCode })
      .andWhere("address.street", { street })
      .getOne();
  }

  async findById(id: string): Promise<BasicAddress> {
    return this.addressRepository
      .createQueryBuilder()
      .select([
        "address.addressId",
        "address.name",
        "address.name",
        "address.city",
        "address.country",
        "address.postalCode",
      ])
      .getOne();
  }
}
