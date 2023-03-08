import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "./Country";

@Entity()
export class Client extends User {
  @Column()
  fidelityLevel: number;

  constructor(
    lastName: string,
    firstName: string,
    age: number,
    address: BasicAddress,
    email: string,
    nationalities?: Country[],
    fidelity?: number
  ) {
    super(lastName, firstName, age, nationalities, address, email);
    this.fidelityLevel = fidelity;
  }
}
