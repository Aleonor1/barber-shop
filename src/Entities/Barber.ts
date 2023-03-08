import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "./Country";

@Entity()
export class Barber extends User {
  @Column({
    type: "enum",
    enum: ExperienceLevel,
    default: ExperienceLevel.JUNIOR,
  })
  experience: ExperienceLevel;

  constructor(
    lastName: string,
    firstName: string,
    age: number,
    address: BasicAddress,
    email: string,
    experience?: ExperienceLevel,
    nationalities?: Country[]
  ) {
    super(lastName, firstName, age, nationalities, address, email);
    this.experience = experience;
  }
}
