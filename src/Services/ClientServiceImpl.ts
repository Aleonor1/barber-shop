import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { ClientRepositoryImpl } from "src/Repositories/ClientRepositoryImpl";
import { Client } from "src/Entities/Client";
import { BasicAddressRepository } from "src/Repositories/BasicAddressRepository";
import { Country } from "src/Entities/Country";
import { ClientBuilderImpl } from "src/Builder/ClientBuilderImpl";
import { statusEnum } from "src/EmailConfirmation/Status";
import { MailSenderService } from "src/EmailConfirmation/MailSenderService";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { ClientNotFoundError } from "@/Utils/CustomErrors/ClientNotFoundError";
import { UpdateClientDto } from "@/DTOS/UpdateClientDto.dts";

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

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
    birthday: Date,
    email: string,
    password: string,
    username: string
  ): Promise<Client> {
    const verifyToken = this.generateToken();

    const newClient = new ClientBuilderImpl()
      .setLastName(lastName)
      .setFirstName(firstName)
      .setEmail(email)
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

  async updateClinet(
    id: string,
    updateClientDto: UpdateClientDto
  ): Promise<Client> {
    this.logger.log(
      `Update client with id: ${id} with new fields: ${updateClientDto}`
    );
    const client = await this.clientRepositoryImpl.findById(id);
    if (!client) {
      throw new ClientNotFoundError();
    }

    const { nationalities, status, fidelityLevel, ...userData } =
      updateClientDto;
    const updateClient = Object.assign(client, userData);
    //TODO FINISH
    // if (nationalities) {
    //   let countriesFromDb: Country[];

    //   nationalities.forEach(
    //     async (coun) => await this.countryRepositoryImpl.findById(coun)
    //   );

    //   updateClient.nationalities = countriesFromDb;
    // }
    if (fidelityLevel) {
      updateClient.fidelityLevel = fidelityLevel;
    }

    return await this.clientRepositoryImpl.createOrUpdate(updateClient);
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

  async deleteClient(id: string): Promise<Client> {
    return this.clientRepositoryImpl.delete(id);
  }

  async restoreSoftDelete(id: string): Promise<Client> {
    return await this.clientRepositoryImpl.restoreSoftDelete(id);
  }

  async getAllClientAppointments(id: string): Promise<Appointment[]> {
    return await this.appointmentRepository.getAllClientAppointmnts(id);
  }

  async getExpiredClients(): Promise<Client[]> {
    const barbers = await this.clientRepositoryImpl.getExpiredClients();
    return barbers;
  }

  async deletePermanently(id: string): Promise<Client> {
    const barber = await this.clientRepositoryImpl.deletePermanently(id);
    return barber;
  }
}
