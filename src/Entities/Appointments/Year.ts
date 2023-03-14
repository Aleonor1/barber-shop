import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Month } from "./Month";

@Entity()
export class Year {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Month, (month) => month.year, {
    cascade: ["insert", "update"],
  })
  months: Month[];

  constructor(months: Month[]) {
    this.months = months;
  }
}
