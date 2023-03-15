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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monthNumber: number;

  @OneToMany(() => Day, (day) => day.month, { cascade: ["insert", "update"] })
  days: Day[];

  @ManyToOne(() => Year, (year) => year.id)
  year: Year;

  constructor(days: Day[], monthNumber: number) {
    this.days = days;
    this.monthNumber = monthNumber;
  }
}
