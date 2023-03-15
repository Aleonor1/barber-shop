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
import { HairdresserService } from "src/Entities/HairdresserService";

@Injectable()
export class HairdresserServicesRepositoryImpl {
  constructor(
    @InjectRepository(HairdresserService)
    private readonly hairdresserServicesRepositoryImpl: Repository<HairdresserService>
  ) {}

  async findById(code: string): Promise<HairdresserService> {
    return await this.hairdresserServicesRepositoryImpl
      .createQueryBuilder("hairdresser_service")
      .select([
        "hairdresser_service.code",
        "hairdresser_service.string",
        "hairdresser_service.price",
      ])
      .where("hairdresser_service.code = :code", {
        code,
      })
      .getOne();
  }

  async uploadHairdresserService(
    string: string,
    code: string,
    price: number
  ): Promise<void> {
    this.hairdresserServicesRepositoryImpl
      .createQueryBuilder()
      .insert()
      .orIgnore()
      .into(HairdresserService)
      .values([
        {
          string: string,
          code: code,
          price: price,
        },
      ])
      .execute();
  }
}
