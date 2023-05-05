import { Barber } from "src/Entities/Barber";
import { Injectable } from "nestjs-injectable";
import { Inject, Logger } from "@nestjs/common";
import { BarberRepositoryImpl } from "src/Repositories/BarberRepositoryImpl";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { BarberBuilderImpl } from "src/Builder/BarberBuilderImpl";
import { CountryRepositoryImpl } from "src/Repositories/CountryRepositoryImpl";
import { Country } from "src/Entities/Country";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Day } from "src/Entities/Appointments/Day";
import { Month } from "src/Entities/Appointments/Month";
import { Year } from "src/Entities/Appointments/Year";
import { ClientsService } from "./ClientServiceImpl";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { HairdresserServicesRepositoryImpl } from "src/Repositories/HairdresserServicesRepositoryImpl";
import { BarberNotFoundError } from "src/Utils/CustomErrors/BarberNotFoundError";
import { ClientNotFoundError } from "src/Utils/CustomErrors/ClientNotFoundError";
import { MailSenderService } from "src/EmailConfirmation/MailSenderService";
import { AppointmentNotFoundError } from "src/Utils/CustomErrors/AppointmentNotFoundError";
import { UpdateBarberDto } from "src/DTOS/UpdateBarberDto.dts";
import { Vacation } from "src/Entities/Vacation";
import { AppointmentStatus } from "@/Utils/AppointmentStatus";
import invoiceService from "@/Utils/GenerateInvoicePdf";

Injectable();
export class BarberServiceImpl {
  private readonly logger = new Logger(BarberServiceImpl.name);
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
    this.logger.log(`Getting barber by ID: ${id}`);
    return await this.barberRepository.findById(id);
  }

  private readonly appointmentsCache = new Map<string, Year>();

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
    description: string,
    addressName?: string,

    id?: string
  ): Promise<Barber> {
    this.logger.log(`Creating new barber`);
    let countriesFromDb: Country[];

    nationalities.forEach(
      async (coun) => await this.countryRepositoryImpl.findById(coun)
    );

    const year = this.handleAppointments();

    const newBarber = new BarberBuilderImpl()
      .setLastName(lastName)
      .setFirstName(firstName)
      .setAge(age)
      .setExperience(experience)
      .setNationalities(countriesFromDb)
      .setEmail(email)
      .setUsername(username)
      .setPassword(password)
      .setDescription(description)
      .setYear(year)
      .build();
    return this.barberRepository.createOrUpdate(newBarber);
  }

  public handleAppointments(): Year {
    const cacheKey = new Date().getFullYear().toString();
    const cachedResult = this.appointmentsCache.get(cacheKey);
    // if (cachedResult) {
    //   return cachedResult;
    // }

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

    const result = new Year(months);
    this.appointmentsCache.set(cacheKey, result);
    return result;
  }

  private daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  async getAllBarbers(): Promise<[Barber[], number]> {
    this.logger.log(`Get all barbers`);
    return await this.barberRepository.getAllBarbers();
  }

  async getAllBarbersIds(): Promise<string[]> {
    this.logger.log(`Get All barbers ids`);
    const [barbers, totalBarbers] = await this.getAllBarbers();
    const ids: string[] = barbers.map((barber) => barber.id);
    return ids;
  }

  async updateBarber(
    id: string,
    updateBarberDto: UpdateBarberDto
  ): Promise<Barber> {
    this.logger.log(
      `Update barber with id: ${id} with new fields: ${updateBarberDto}`
    );
    const barber = await this.barberRepository.findById(id);
    if (!barber) {
      throw new BarberNotFoundError();
    }

    const { experience, nationalities, year, ...userData } = updateBarberDto;
    const updatedBarber = Object.assign(barber, userData);
    if (experience) {
      updatedBarber.experience = experience;
    }
    if (nationalities) {
      let countriesFromDb: Country[];

      nationalities.forEach(
        async (coun) => await this.countryRepositoryImpl.findById(coun)
      );

      updatedBarber.nationalities = countriesFromDb;
    }
    if (year) {
      updatedBarber.year = year;
    }

    return await this.barberRepository.createOrUpdate(updatedBarber);
  }

  async deleteBarber(id: string): Promise<Barber> {
    this.logger.log(`Soft delete barber with id:${id}`);
    let barber = await this.barberRepository.findById(id);
    if (!barber) {
      throw new BarberNotFoundError();
    }

    barber = await this.barberRepository.delete(id);
    return barber;
  }

  async restoreSoftDelete(id: string): Promise<Barber> {
    this.logger.log(`Restore soft delete for barber with id:${id}`);
    let barber = await this.barberRepository.findById(id);

    if (!barber) {
      throw new BarberNotFoundError();
    }
    barber = await this.barberRepository.restoreSoftDelete(id);
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
    if (appointment && appointment.status === AppointmentStatus.CONFIRMED) {
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
    const date = new Date();
    date.setMonth(month);
    date.setDate(day);
    date.setHours(0);
    if (barber.hasVacation(date)) {
      throw new Error("Barber has vacation");
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
      await this.appointmentRepository.createOrUpdate(appointment);
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
    const barber = await this.barberRepository.getBarberWithAppointments(
      barberId
    );
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
          (appointment) =>
            appointment.booked &&
            appointment.status === AppointmentStatus.CONFIRMED
        );
      });
    });

    return appointments;
  }

  async getAllBarberAppointmentsOnSpecificDate(
    barberId: string,
    monthNumber: number,
    dayNumber: number
  ): Promise<Appointment[]> {
    const barber =
      await this.barberRepository.getBarberWithAppointmentsOnSpecificDate(
        barberId,
        dayNumber,
        monthNumber
      );

    if (!barber) {
      throw new BarberNotFoundError();
    }

    const appointments = barber.year.months.flatMap((month) => {
      return month.days.flatMap((day) => {
        return day.appointments.filter(
          (appointment) =>
            appointment.booked &&
            appointment.status === AppointmentStatus.CONFIRMED
        );
      });
    });

    return appointments;
  }

  async getAllBarberFreeAppointmentsOnSpecificDate(
    barberId: string,
    monthNumber: number,
    dayNumber: number
  ): Promise<Appointment[]> {
    const barber =
      await this.barberRepository.getBarberWithAppointmentsOnSpecificDate(
        barberId,
        monthNumber,
        dayNumber
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

  async getExpiredBarbers(): Promise<Barber[]> {
    const barbers = await this.barberRepository.getExpiredBarbers();
    return barbers;
  }

  async deletePermanently(id: string): Promise<Barber> {
    const barber = await this.barberRepository.deletePermanently(id);
    return barber;
  }

  async requestVacation(vacationRequest: VacationRequest): Promise<void> {
    const { barberId, startDate, endDate } = vacationRequest;
    // Check if the barber is already on vacation during the requested time period
    const barber = await this.barberRepository.findById(barberId);

    if (!barber) {
      throw new BarberNotFoundError();
    }

    const isOnVacation = barber.getVacations().some((vacation) => {
      return startDate >= vacation.startDate && endDate <= vacation.endDate;
    });

    if (isOnVacation) {
      console.log(
        "Barber is already on vacation during requested time period."
      );
      return;
    }

    const vacation = new Vacation(startDate, endDate);
    barber.addVacations(vacation);

    this.barberRepository.update(barber.id, barber);
  }

  async completeAppointment(
    barberId: string,
    appointmentId: string
  ): Promise<Appointment> {
    try {
      const [barber, appointment] = await Promise.all([
        this.barberRepository.findById(barberId),
        this.appointmentRepository.getAppointmentById(appointmentId),
      ]);

      if (!appointment) {
        throw new Error(`Appointment with id ${appointmentId} not found`);
      }

      if (appointment.status === AppointmentStatus.COMPLETED) {
        throw new Error(
          `Appointment with id ${appointmentId} has already been completed`
        );
      }

      const clinet = appointment.client;
      appointment.status = AppointmentStatus.COMPLETED;

      const invoice = {
        invoiceNumber: "12345",
        date: "2023-03-26",
        clientName: "John Doe",
        totalAmount: 123.45,
        services: [appointment.service],
        //TODO FINISh
      };
      const pdfBuffer = await invoiceService.generateInvoicePdf(
        invoice,
        appointment
      );
      const mailSender = await MailSenderService.getInstance();
      mailSender.sendInvoiceToClient(clinet.email, pdfBuffer);
      const updatedAppointment =
        await this.appointmentRepository.createOrUpdate(appointment);

      return updatedAppointment;
    } catch (error) {
      throw new Error(
        `Failed to complete appointment with id ${appointmentId}: ${error.message}`
      );
    }
  }
}
