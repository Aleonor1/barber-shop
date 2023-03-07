import { Injectable } from "nestjs-injectable";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Repository,
  SelectQueryBuilder,
  UpdateResult,
  getManager,
} from "typeorm";
import { Barber } from "src/Entities/Barber";
import { UserRepository } from "./UserRepository";

@Injectable()
export class BarberRepositoryImpl implements UserRepository {
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
      .where("barber.id = :id", {
        id,
      })
      .getOne();
  }

  async createOrUpdate(barber: Barber): Promise<Barber> {
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

    return this.findById(barber.id);
  }

  async update(id: string, barber: Barber): Promise<Barber> {
    this.barberRepository
      .createQueryBuilder()
      .update(Barber)
      .set({
        firstName: barber.firstName,
        lastName: barber.lastName,
        age: barber.age,
        experience: barber.experience,
        nationality: barber.nationality,
        address: barber.address,
      })
      .where("id = :id", { id: barber.id });

    return this.findById(id);
  }

  async delete(barberId: string): Promise<UpdateResult> {
    return this.barberRepository
      .createQueryBuilder("barber")
      .softDelete()
      .where("id = :id", { id: barberId })
      .execute();
  }

  async restoreSoftDelete(barberId: string): Promise<UpdateResult> {
    return this.barberRepository
      .createQueryBuilder()
      .restore()
      .where("id = :id", { id: barberId })
      .execute();
  }
}
