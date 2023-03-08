import { Injectable } from "nestjs-injectable";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Repository,
  SelectQueryBuilder,
  UpdateResult,
  getManager,
} from "typeorm";
import { UserRepository } from "./UserRepository";
import { Client } from "src/Entities/Client";
import { Country } from "src/Entities/Country";

@Injectable()
export class CountryRepositoryImpl {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}

  async findById(id: string): Promise<Country> {
    return await this.countryRepository
      .createQueryBuilder("country")
      .select(["country.code", "country.name"])
      .where("country.code = :id", {
        id,
      })
      .getOne();
  }

  async uploadCountry(name: string, code: string): Promise<void> {
    this.countryRepository
      .createQueryBuilder()
      .insert()
      .orIgnore()
      .into(Country)
      .values([
        {
          name: name,
          code: code,
        },
      ])
      .execute();
  }
}
