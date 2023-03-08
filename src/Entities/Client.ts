import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Country } from "src/Utils/Countries";
import { BasicAddress } from "src/Utils/Address";

@Entity()
export class Client extends User {
  @Column()
  fidelityLevel: number;

  constructor(
    lastName: string,
    firstName: string,
    age: number,
    address: BasicAddress,
    fidelity?: number,
    nationality?: Country
  ) {
    super(lastName, firstName, age, nationality, address);
    this.fidelityLevel = fidelity;
  }
}
