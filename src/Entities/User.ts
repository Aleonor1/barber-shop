import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import { Country } from "../Utils/Countries";
import { BasicAddress } from "src/Utils/Address";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";

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

  @Column({
    type: "enum",
    enum: Country,
    default: Country.Romania,
  })
  nationality: Country;

  @OneToOne(() => BasicAddress)
  @JoinColumn()
  address: BasicAddress;

  constructor(firstName, lastName, age, nationality, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.nationality = nationality;
    this.address = address;
  }

  @DeleteDateColumn()
  deletedAt?: Date;
}
