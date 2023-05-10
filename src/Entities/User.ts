import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "./Country";
import { use } from "passport";

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, type: "date" })
  birthdate: Date;

  @OneToOne(() => Country)
  @JoinColumn()
  nationalities: Country[];

  @Column()
  userName: string;

  @Column()
  password: string;

  constructor(
    firstName: string,
    lastName: string,
    birthdate: Date,
    nationalities: Country[],
    address: BasicAddress,
    email: string,
    userName: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.nationalities = nationalities;
    this.email = email;
    this.userName = userName;
    this.password = password;
  }

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ unique: true })
  email: string;

  abstract toString(): string;
}
