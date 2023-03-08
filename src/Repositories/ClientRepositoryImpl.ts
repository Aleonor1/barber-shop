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

@Injectable()
export class ClientRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepositories: Repository<Client>
  ) {}

  async getAllClients(): Promise<[Client[], number]> {
    return this.clientRepositories
      .createQueryBuilder("client")
      .select(["client.id", "client.lastName", "client.firstName"])
      .getManyAndCount();
  }

  async findById(id: string): Promise<Client> {
    return this.clientRepositories
      .createQueryBuilder("client")
      .select(["client.id", "client.lastName", "client.firstName"])
      .where("client.id = :id", {
        id,
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
          id: client.id,
          firstName: client.firstName,
          lastName: client.lastName,
        },
      ])
      .orUpdate({
        conflict_target: ["id"],
        overwrite: ["firstName", "lastName"],
      })
      .execute();

    return this.findById(client.id);
  }

  async update(id: string, client: Client): Promise<Client> {
    this.clientRepositories
      .createQueryBuilder()
      .update(Client)
      .set({
        firstName: client.firstName,
        lastName: client.lastName,
        age: client.age,
        fidelityLevel: client.fidelityLevel,
        nationalities: client.nationalities,
        address: client.address,
      })
      .where("id = :id", { id: client.id });

    return this.findById(id);
  }

  async delete(clientId: string): Promise<UpdateResult> {
    return this.clientRepositories
      .createQueryBuilder("client")
      .softDelete()
      .where("id = :id", { id: clientId })
      .execute();
  }

  async restoreSoftDelete(clientId: string): Promise<UpdateResult> {
    return this.clientRepositories
      .createQueryBuilder()
      .restore()
      .where("id = :id", { id: clientId })
      .execute();
  }
}
