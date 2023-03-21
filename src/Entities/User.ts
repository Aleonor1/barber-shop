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

  @Column({ nullable: false, type: "integer", default: 0 })
  age: number;

  @OneToOne(() => Country)
  @JoinColumn()
  nationalities: Country[];

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => BasicAddress)
  @JoinColumn()
  address: BasicAddress;

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    nationalities: Country[],
    address: BasicAddress,
    email: string,
    username: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.nationalities = nationalities;
    this.address = address;
    this.email = email;
    this.username = username;
    this.password = password;
  }

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ unique: true })
  email: string;

  abstract toString(): string;
}
