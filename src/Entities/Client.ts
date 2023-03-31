import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "./Country";
import { statusEnum } from "src/EmailConfirmation/Status";
import { Appointment } from "./Appointments/Appointment";
import { FidelityLevel } from "@/Utils/FidelityLevel";

@Entity()
export class Client extends User {
  @Column({
    type: "enum",
    enum: FidelityLevel,
    default: FidelityLevel.BRONZE,
  })
  fidelityLevel: FidelityLevel;

  @Column({
    type: "enum",
    enum: statusEnum,
    default: statusEnum.pending,
  })
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
    username: string,
    password: string,
    nationalities?: Country[]
  ) {
    super(
      lastName,
      firstName,
      age,
      nationalities,
      address,
      email,
      username,
      password
    );
    this.status = statusEnum.pending;
    this.token = token;
  }

  public toString(): string {
    return `Client: 
    Last Name : ${this.lastName}
    First Name: ${this.firstName}
    Age: ${this.age}, 
    Username: ${this.username}, 
    Experience: ${this.fidelityLevel}, 
    Nationalities: ${this.nationalities}`;
  }
}
