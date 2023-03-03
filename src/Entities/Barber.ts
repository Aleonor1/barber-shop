import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Country } from "src/Utils/Countries";

@Entity()
export class Barber extends User {
  constructor(
    lastName: string,
    firstName: string,
    age: number,
    nationality?: Country
  ) {
    super();
    this.lastName = lastName;
    this.firstName = firstName;
    this.nationality = nationality ? nationality : Country.Romania;
    this.age = age;
  }
}
