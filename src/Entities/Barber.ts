import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Country } from "src/Utils/Countries";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { BasicAddress } from "src/Utils/Address";

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
    experience?: ExperienceLevel,
    nationality?: Country
  ) {
    super(lastName, firstName, age, nationality, address);
    this.experience = experience;
  }
}
