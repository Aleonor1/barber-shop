import { Barber } from "src/Entities/Barber";
import { Injectable } from "nestjs-injectable";
import { Inject } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import exp from "constants";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { UpdateResult } from "typeorm";
import { BarberBuilderImpl } from "src/Builder/BarberBuilderImpl";
import { CountryRepositoryImpl } from "src/Repositories/CountryRepositoryImpl";
import { Country } from "src/Entities/Country";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Day } from "src/Entities/Appointments/Day";
import { Month } from "src/Entities/Appointments/Month";
import { Year } from "src/Entities/Appointments/Year";
import { BarberService } from "src/Entities/BarberService";

Injectable();
export class BarberServiceImpl {
  constructor(
    @Inject(BarberRepositoryImpl)
    private readonly barberRepository: BarberRepositoryImpl,
    @Inject(BasicAddressRepository)
    private readonly basicAddressRepository: BasicAddressRepository,
    @Inject(CountryRepositoryImpl)
    private readonly countryRepositoryImpl: CountryRepositoryImpl
  ) {}

  public async getBarberById(id: string): Promise<Barber> {
    return await this.barberRepository.findById(id);
  }

  async create(
    firstName: string,
    lastName: string,
    age: number,
    nationalities: string[],
    street: string,
    city: string,
    country: string,
    postalCode: string,
    experience: ExperienceLevel,
    email: string,
    username: string,
    password: string,
    addressName?: string,
    id?: string
  ): Promise<Barber> {
    const address = await this.basicAddressRepository.handleAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );

    let countriesFromDb: Country[];

    nationalities.forEach(
      async (coun) => await this.countryRepositoryImpl.findById(coun)
    );

    const year = this.handleAppointments();

    const newBarber = new BarberBuilderImpl()
      .setLastName(lastName)
      .setFirstName(firstName)
      .setAge(age)
      .setAddress(address)
      .setExperience(experience)
      .setNationalities(countriesFromDb)
      .setEmail(email)
      .setUsername(username)
      .setPassword(password)
      .setYear(year)
      .build();
    return await this.barberRepository.createOrUpdate(newBarber);
  }

  private handleAppointments(): Year {
    let appointments: Appointment[] = new Array<Appointment>();
    let months: Month[] = new Array<Month>();

    for (let hour = 8; hour < 17; hour++) {
      appointments.push(new Appointment(`${hour}:00`, `${hour + 1}:00`));
    }

    for (let month = 1; month < 13; month++) {
      const daysInMonth = this.daysInMonth(month, new Date().getFullYear());
      let currentMonthDays = new Array<Day>();
      for (let day = 1; day <= daysInMonth; day++) {
        currentMonthDays.push(new Day(appointments, day));
      }
      months.push(new Month(currentMonthDays, month));
    }

    return new Year(months);
  }

  private daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  async getAllBarbers(): Promise<[Barber[], number]> {
    return await this.barberRepository.getAllBarbers();
  }

  async updateBarber(id: string, newBarber: Barber): Promise<Barber> {
    return this.barberRepository.update(id, newBarber);
  }

  async deleteBarber(id: string): Promise<UpdateResult> {
    return await this.barberRepository.delete(id);
  }

  async restoreSoftDelete(id: string): Promise<UpdateResult> {
    return await this.barberRepository.restoreSoftDelete(id);
  }

  async addAppointment(
    barberId: string,
    day: number,
    month: number,
    from: string,
    to: string,
    service: BarberService,
    clientId: string
  ) {
    const barber = await this.getBarberById(barberId);
    barber.setAppointment(month, day, from);
  }
}
