import { Injectable } from "nestjs-injectable";
import { User } from "../entities/User";
import { UserRepository } from "./UserRepository";
import { BarberRepository } from "./BarberRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder, getManager } from "typeorm";
import { Barber } from "src/Entities/Barber";

@Injectable()
export class BarberRepositoryImpl {
  constructor(
    @InjectRepository(Barber)
    private readonly barberRepository: Repository<Barber>
  ) {}

  async findById(id: string): Promise<Barber> {
    return this.barberRepository
      .createQueryBuilder("barber")
      .select(["barber.id", "barber.lastName", "barber.firstName"])
      .where("buyer.id = :id", {
        id,
      })
      .getOne();
  }

  async saveBarber(barber: Barber): Promise<void> {
    await this.barberRepository
      .createQueryBuilder()
      .insert()
      .into(Barber)
      .values([
        {
          id: barber.id,
          firstName: barber.firstName,
          lastName: barber.lastName,
        },
      ])
      .execute();
  }
}
