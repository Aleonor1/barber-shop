import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import { BasicAddress } from "src/Utils/Address";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { Country } from "./Country";

@Entity()
export class User {
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

  @OneToOne(() => BasicAddress)
  @JoinColumn()
  address: BasicAddress;

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    nationalities: Country[],
    address: BasicAddress,
    email: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.nationalities = nationalities;
    this.address = address;
    this.email = email;
  }

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;
}
