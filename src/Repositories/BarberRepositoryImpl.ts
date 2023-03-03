import { Injectable } from "nestjs-injectable";
import { User } from "../entities/User";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder, getManager } from "typeorm";
import { Barber } from "src/Entities/Barber";
import { Inject } from "@nestjs/common";
import { resource } from "postgre";

@Injectable()
export class BarberRepositoryImpl {
  constructor(
    @InjectRepository(Barber)
    private readonly barberRepository: Repository<Barber>
  ) {}

  async getAllBarbers(): Promise<[Barber[], number]> {
    return this.barberRepository
      .createQueryBuilder("barber")
      .select(["barber.id", "barber.lastName", "barber.firstName"])
      .getManyAndCount();
  }

  async findById(id: string): Promise<Barber> {
    return this.barberRepository
      .createQueryBuilder("barber")
      .select(["barber.id", "barber.lastName", "barber.firstName"])
      .where("buyer.id = :id", {
        id,
      })
      .getOne();
  }

  async createOrUpdate(barber: Barber): Promise<void> {
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
      .orUpdate({
        conflict_target: ["id"],
        overwrite: ["firstName", "lastName"],
      })
      .execute();
  }

  async update(barber: Barber): Promise<void> {
    this.barberRepository
      .createQueryBuilder()
      .update(Barber)
      .set({
        firstName: barber.firstName,
        lastName: barber.lastName,
      })
      .where("id = :id", { id: barber.id });
  }

  async delete(barberId: string): Promise<void> {
    this.barberRepository
      .createQueryBuilder()
      .softDelete()
      .from(Barber)
      .where("id = :id", { id: barberId });
  }

  async restoreSoftDelete(barberId: string): Promise<void> {
    this.barberRepository
      .createQueryBuilder()
      .restore()
      .where("id =: id", { id: barberId });
  }
}
