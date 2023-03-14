import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Day } from "./Day";
import { Year } from "./Year";

@Entity()
export class Month {
  @PrimaryColumn()
  monthNumber: number;

  @OneToMany(() => Day, (day) => day.month, { cascade: ["insert", "update"] })
  days: Day[];

  @ManyToOne(() => Year, (year) => year.months)
  year: Year;

  constructor(days: Day[], monthNumber: number) {
    this.days = days;
    this.monthNumber = monthNumber;
  }
}
