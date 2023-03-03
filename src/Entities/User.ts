import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "../Utils/Countries";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({
    type: "enum",
    enum: Country,
    default: Country.Romania,
  })
  nationality: Country;
}
