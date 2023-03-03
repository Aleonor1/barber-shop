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
      .createQueryBuilder("basic_address")
      .select([
        "basic_address.addressId",
        "basic_address.name",
        "basic_address.city",
        "basic_address.country",
        "basic_address.postalCode",
        "basic_address.street",
      ])
      .where("basic_address.name = :name", {
        name,
      })
      .andWhere("basic_address.city = :city", {
        city,
      })
      .andWhere("basic_address.country = :country", {
        country,
      })
      .andWhere("basic_address.postalCode = :postalCode", {
        postalCode,
      })
      .andWhere("basic_address.street = :street", {
        street,
      })
      .getOne();
  }

  async createAddress(
    name: string,
    city: string,
    country: string,
    postalCode: string,
    street: string
  ): Promise<void> {
    this.addressRepository
      .createQueryBuilder()
      .insert()
      .into(BasicAddress)
      .values([
        {
          name: name,
          city: city,
          street: street,
          country: country,
          postalCode: postalCode,
        },
      ])
      .execute();
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
