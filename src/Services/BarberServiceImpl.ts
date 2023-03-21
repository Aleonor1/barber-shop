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
import { HairdresserService } from "src/Entities/HairdresserService";
import { ClientsService } from "./ClientServiceImpl";
import { Client } from "src/Entities/Client";
import { ClientSessionRequestOptions } from "http2";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { HairdresserServicesRepositoryImpl } from "src/Repositories/HairdresserServicesRepositoryImpl";
import { BarberNotFoundError } from "src/Utils/CustomErrors/BarberNotFoundError";
import { ClientNotFoundError } from "src/Utils/CustomErrors/ClientNotFoundError";
import { MailSenderService } from "src/EmailConfirmation/MailSenderService";
import { AppointmentNotFoundError } from "src/Utils/CustomErrors/AppointmentNotFoundError";

Injectable();
export class BarberServiceImpl {
  constructor(
    @Inject(BarberRepositoryImpl)
    private readonly barberRepository: BarberRepositoryImpl,
    @Inject(BasicAddressRepository)
    private readonly basicAddressRepository: BasicAddressRepository,
    @Inject(CountryRepositoryImpl)
    private readonly countryRepositoryImpl: CountryRepositoryImpl,
    @Inject(ClientsService)
    private readonly clientService: ClientsService,
    @Inject(AppointmentRepositoryImpl)
    private readonly appointmentRepository: AppointmentRepositoryImpl,
    @Inject(HairdresserServicesRepositoryImpl)
    private readonly hairdresserServicesRepositoryImpl: HairdresserServicesRepositoryImpl
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
    return this.barberRepository.createOrUpdate(newBarber);
  }

  private handleAppointments(): Year {
    let appointments: Appointment[] = new Array<Appointment>();
    let months: Month[] = new Array<Month>();

    for (let month = 1; month < 13; month++) {
      const daysInMonth = this.daysInMonth(month, new Date().getFullYear());
      let currentMonthDays = new Array<Day>();
      for (let day = 1; day <= daysInMonth; day++) {
        appointments = new Array<Appointment>();
        for (let hour = 8; hour < 17; hour++) {
          appointments.push(new Appointment(`${hour}:00`, `${hour + 1}:00`));
        }
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

  async deleteBarber(id: string): Promise<Barber> {
    const barber = await this.barberRepository.delete(id);
    if (!barber) {
      throw new BarberNotFoundError();
    }

    return barber;
  }

  async restoreSoftDelete(id: string): Promise<Barber> {
    const barber = await this.barberRepository.restoreSoftDelete(id);
    if (!barber) {
      throw new BarberNotFoundError();
    }
    return barber;
  }

  async verifyAppointment(
    barberId: string,
    appointmentId: string
  ): Promise<Appointment> {
    let appointment = undefined;
    const barber = this.barberRepository.findById(barberId);
    if (!barber) {
      throw new BarberNotFoundError();
    }
    appointment = await this.appointmentRepository.getAppointmentById(
      appointmentId
    );
    if (!appointment) {
      throw new AppointmentNotFoundError();
    }
    if (appointment && appointment.isConfirmed) {
      throw new Error("Appointment is already confirmed");
    }
    appointment.confirm();

    this.appointmentRepository.createOrUpdate(appointment);
    return appointment;
  }

  async addAppointment(
    barberId: string,
    day: number,
    month: number,
    from: string,
    to: string,
    service: string,
    clientId: string
  ): Promise<Appointment> {
    const { barber, client } = await this.getBarberAndClient(
      barberId,
      clientId
    );
    if (!barber) {
      throw new BarberNotFoundError();
    } else if (!client) {
      throw new ClientNotFoundError();
    }
    let appointment = barber.getAppointment(month, day, from, to);
    if (appointment.booked) {
      throw new Error("Appointment is already booked");
    }

    const hairDresserService =
      await this.hairdresserServicesRepositoryImpl.findById(service);
    if (hairDresserService) {
      appointment.setService(hairDresserService);
      appointment.setClient(client);
      appointment.setBooked(true);
      // appointment.setBarber(barber);
      await this.appointmentRepository.createOrUpdate(appointment);
      // this.barberRepository.createOrUpdate(barber);
    }

    await this.sendEmailCreatedAppointment(appointment, barber);
    return appointment;
  }

  private async sendEmailCreatedAppointment(
    appointment: Appointment,
    barber: Barber
  ) {
    const mailSender = MailSenderService.getInstance();
    await mailSender.sendMailAppointmentToBarber(
      "aleonornyikita@gmail.com",
      "aleonornyikita@gmail.com",
      appointment,
      barber.id
    );
  }

  private async getBarberAndClient(barberId: string, clientId: string) {
    const barber = await this.getBarberById(barberId);
    if (!barber) {
      throw new BarberNotFoundError();
    }
    const client = await this.clientService.findOne(clientId);
    if (!client) {
      throw new ClientNotFoundError();
    }
    return { barber, client };
  }

  async getAllBarberAppointments(barberId: string): Promise<Appointment[]> {
    const barber = await this.barberRepository.getBarberWithAppointments(
      barberId
    );

    if (!barber) {
      throw new BarberNotFoundError();
    }

    const appointments = barber.year.months.flatMap((month) => {
      return month.days.flatMap((day) => {
        return day.appointments.filter(
          (appointment) => appointment.booked && appointment.isConfirmed
        );
      });
    });

    return appointments;
  }

  async getBarberEmptyAppointments(barberId: string): Promise<Appointment[]> {
    const barber = await this.barberRepository.getBarberWithAppointments(
      barberId
    );

    if (!barber) {
      throw new BarberNotFoundError();
    }

    const appointments = barber.year.months.flatMap((month) => {
      return month.days.flatMap((day) => {
        return day.appointments.filter((appointment) => !appointment.booked);
      });
    });

    return appointments;
  }
}
