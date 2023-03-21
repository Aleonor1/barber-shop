import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { Client } from "src/Entities/Client";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { Country } from "src/Entities/Country";
import { ClientBuilderImpl } from "src/Builder/ClientBuilderImpl";
import { statusEnum } from "src/EmailConfirmation/Status";
import { MailSenderService } from "src/EmailConfirmation/MailSenderService";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";

@Injectable()
export class ClientsService {
  constructor(
    @Inject(ClientRepositoryImpl)
    private readonly clientRepositoryImpl: ClientRepositoryImpl,
    @Inject(BasicAddressRepository)
    private readonly basicAddressRepository: BasicAddressRepository,
    @Inject(AppointmentRepositoryImpl)
    private readonly appointmentRepository: AppointmentRepositoryImpl
  ) {}

  async create(
    firstName: string,
    lastName: string,
    age: number,
    street: string,
    city: string,
    country: string,
    postalCode: string,
    addressName: string,
    email: string,
    nationalities: Country[],
    username: string,
    password: string
  ): Promise<Client> {
    let address = await this.basicAddressRepository.handleAddress(
      addressName,
      city,
      country,
      street,
      postalCode
    );

    const verifyToken = this.generateToken();

    const newClient = new ClientBuilderImpl()
      .setLastName(lastName)
      .setFirstName(firstName)
      .setAge(age)
      .setAddress(address)
      .setEmail(email)
      .setNationalities(nationalities)
      .setFidelityLevel(0)
      .setToken(verifyToken)
      .setUsername(username)
      .setPassword(password)
      .build();

    const dbClient = await this.clientRepositoryImpl.createOrUpdate(newClient);
    const mailSender = MailSenderService.getInstance();
    mailSender.sendMail(
      "aleonornyikita@gmail.com",
      dbClient.token,
      dbClient.id
    );

    return dbClient;
  }

  findAll() {
    return this.clientRepositoryImpl.getAllClients();
  }

  generateToken(): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charLength = chars.length;
    let result = "";
    for (let i = 0; i < 30; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  async verify(token: string, id: string): Promise<Client> {
    let client = await this.clientRepositoryImpl.findById(id);

    if (client && client.token === token) {
      client.status = statusEnum.active;
      await this.clientRepositoryImpl.verifyUser(client);
    }

    return this.findOne(id);
  }

  findOne(id: string) {
    return this.clientRepositoryImpl.findById(id);
  }

  async deleteBarber(id: string): Promise<Client> {
    return this.clientRepositoryImpl.delete(id);
  }

  async restoreSoftDelete(id: string): Promise<Client> {
    return await this.clientRepositoryImpl.restoreSoftDelete(id);
  }

  async getAllClientAppointments(id: string): Promise<Appointment[]> {
    return await this.appointmentRepository.getAllClientAppointmnts(id);
  }
}
