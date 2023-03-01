import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Barber extends User {
  constructor(id: string, lastName: string, firstName: string) {
    super();
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
  }
}
