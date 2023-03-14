import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "./Country";
import { statusEnum } from "src/EmailConfirmation/Status";

@Entity()
export class Client extends User {
  @Column({ default: 0 })
  fidelityLevel: number;

  @Column()
  status: statusEnum;

  @Column()
  token: string;

  constructor(
    lastName: string,
    firstName: string,
    age: number,
    address: BasicAddress,
    email: string,
    token: string,
    nationalities?: Country[]
  ) {
    super(lastName, firstName, age, nationalities, address, email);
    this.fidelityLevel = 0;
    this.status = statusEnum.pending;
    this.token = token;
  }
}
