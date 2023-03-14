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
import { MailSenderService } from "src/EmailConfirmation/MailSenderService";

@Injectable()
export class ClientRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepositories: Repository<Client>
  ) {}

  async getAllClients(): Promise<[Client[], number]> {
    return this.clientRepositories
      .createQueryBuilder("client")
      .select([
        "client.id",
        "client.lastName",
        "client.firstName",
        "client.age",
        "client.email",
        "client.fidelityLevel",
        "client.nationalities",
        "client.address",
        "client.status",
        "client.token",
      ])
      .getManyAndCount();
  }

  async findById(id: string): Promise<Client> {
    return this.clientRepositories
      .createQueryBuilder("client")
      .select([
        "client.id",
        "client.lastName",
        "client.firstName",
        "client.age",
        "client.email",
        "client.fidelityLevel",
        "client.nationalities",
        "client.address",
        "client.status",
        "client.token",
      ])
      .where("client.id = :id", {
        id,
      })
      .getOne();
  }

  async findByGeneric(field: string, value: string): Promise<Client> {
    return this.clientRepositories
      .createQueryBuilder("client")
      .select([
        "client.id",
        "client.lastName",
        "client.firstName",
        "client.age",
        "client.email",
        "client.fidelityLevel",
        "client.nationalities",
        "client.address",
        "client.status",
        "client.token",
      ])
      .where(`client.${field} = :value`, {
        value,
      })
      .getOne();
  }

  async createOrUpdate(client: Client): Promise<Client> {
    await this.clientRepositories
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values([
        {
          firstName: client.firstName,
          lastName: client.lastName,
          age: client.age,
          email: client.email,
          fidelityLevel: client.fidelityLevel,
          nationalities: client.nationalities,
          address: client.address,
          status: client.status,
          token: client.token,
        },
      ])
      .orUpdate({
        conflict_target: ["id"],
        overwrite: ["firstName", "lastName"],
      })
      .execute();

    return this.findByGeneric("email", client.email);
  }

  async update(id: string, client: Client): Promise<Client> {
    this.clientRepositories
      .createQueryBuilder()
      .update(Client)
      .set({
        firstName: client.firstName,
        lastName: client.lastName,
        age: client.age,
        email: client.email,
        fidelityLevel: client.fidelityLevel,
        nationalities: client.nationalities,
        address: client.address,
      })
      .where("id = :id", { id: client.id });

    return this.findById(id);
  }

  async verifyUser(client: Client): Promise<Client> {
    this.clientRepositories
      .createQueryBuilder()
      .update(Client)
      .set({ status: client.status })
      .where("id = :id", { id: client.id })
      .execute();

    return this.findById(client.id);
  }

  async delete(clientId: string): Promise<Client> {
    this.clientRepositories
      .createQueryBuilder("client")
      .softDelete()
      .where("id = :id", { id: clientId })
      .execute();

    return this.findById(clientId);
  }

  async restoreSoftDelete(clientId: string): Promise<Client> {
    this.clientRepositories
      .createQueryBuilder()
      .restore()
      .where("id = :id", { id: clientId })
      .execute();

    return this.findById(clientId);
  }
}
