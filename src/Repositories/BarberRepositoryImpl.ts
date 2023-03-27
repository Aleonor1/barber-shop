import { Injectable } from "nestjs-injectable";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, getManager } from "typeorm";
import { Barber } from "src/Entities/Barber";
import { UserRepository } from "./UserRepository";
import { Year } from "src/Entities/Appointments/Year";
import { Appointment } from "src/Entities/Appointments/Appointment";

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
      .where("barber.id = :id", {
        id,
      })
      .getOne();
  }

  async getExpiredBarbers(): Promise<Barber[]> {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expiredBarbers = await this.barberRepository
      .createQueryBuilder("barber")
      .where("barber.deletedAt < :thirtyDaysAgo", { thirtyDaysAgo })
      .getMany();

    return expiredBarbers;
  }

  async createOrUpdate(barber: Barber): Promise<Barber> {
    await this.barberRepository.save(barber);
    return await this.findByGeneric("email", barber.email);
  }

  async findByGeneric(field: string, value: string): Promise<Barber> {
    return this.barberRepository
      .createQueryBuilder("barber")
      .where(`barber.${field} = :value`, {
        value,
      })
      .getOne();
  }

  // async createOrUpdate(barber: Barber): Promise<Barber> {
  //   await this.barberRepository
  //     .createQueryBuilder()
  //     .insert()
  //     .into(Barber)
  //     .values([
  //       {
  //         id: barber.id,
  //         firstName: barber.firstName,
  //         lastName: barber.lastName,
  //         age: barber.age,
  //         email: barber.email,
  //         experience: barber.experience,
  //         nationalities: barber.nationalities,
  //         address: barber.address,
  //         username: barber.username,
  //         password: barber.password,
  //         year: barber.year,
  //       },
  //     ])
  //     .orUpdate({
  //       conflict_target: ["id"],
  //       overwrite: ["firstName", "lastName"],
  //     })
  //     .execute();

  //   return this.findById(barber.id);
  // }

  async update(id: string, barber: Barber): Promise<Barber> {
    this.barberRepository
      .createQueryBuilder()
      .update(Barber)
      .set({
        firstName: barber.firstName,
        lastName: barber.lastName,
        age: barber.age,
        experience: barber.experience,
        nationalities: barber.nationalities,
        address: barber.address,
      })
      .where("id = :id", { id: barber.id });

    return this.findById(id);
  }

  async delete(barberId: string): Promise<Barber> {
    await this.barberRepository
      .createQueryBuilder("barber")
      .softDelete()
      .where("id = :id", { id: barberId })
      .execute();

    return await this.findById(barberId);
  }

  async restoreSoftDelete(barberId: string): Promise<Barber> {
    await this.barberRepository
      .createQueryBuilder()
      .restore()
      .where("id = :id", { id: barberId })
      .execute();

    return await this.findById(barberId);
  }

  async deletePermanently(barberId: string): Promise<Barber> {
    await this.barberRepository
      .createQueryBuilder("barber")
      .delete()
      .where("id = :id", { id: barberId })
      .execute();

    return await this.findById(barberId);
  }

  async getBarberWithAppointments(id: string): Promise<Barber> {
    return (
      this.barberRepository
        .createQueryBuilder("barber")
        .select("barber")
        .leftJoinAndSelect("barber.year", "year")
        .leftJoinAndSelect("year.months", "months")
        .leftJoinAndSelect("months.days", "days")
        .leftJoinAndSelect("days.appointments", "appointments")
        .leftJoinAndSelect("appointments.client", "client")
        // .leftJoinAndSelect("appointments.service", "service")
        // .leftJoinAndSelect("appointments.client", "client")
        .where("barber.id = :id", {
          id,
        })
        .getOne()
    );
  }

  async getBarberWithAppointmentsOnSpecificDate(
    id: string,
    dayNumber: number,
    monthNumber: number
  ): Promise<Barber> {
    return (
      this.barberRepository
        .createQueryBuilder("barber")
        .select("barber")
        .leftJoinAndSelect("barber.year", "year")
        .leftJoinAndSelect("year.months", "months")
        .leftJoinAndSelect("months.days", "days")
        .leftJoinAndSelect("days.appointments", "appointments")
        // .leftJoinAndSelect("appointments.service", "service")
        // .leftJoinAndSelect("appointments.client", "client")
        .where("barber.id = :id", {
          id,
        })
        .andWhere("months.monthNumber = :monthNumber", {
          monthNumber: monthNumber,
        })
        .andWhere("days.dayNumber = :dayNumber", { dayNumber: dayNumber })
        .getOne()
    );
  }
}
