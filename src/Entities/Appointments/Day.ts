import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { Month } from "./Month";

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayNumber: number;

  @OneToMany(() => Appointment, (appointment) => appointment.day, {
    cascade: ["insert", "update"],
  })
  public appointments: Appointment[];

  @ManyToOne(() => Month, (month) => month.days)
  month: Month;

  constructor(appointments: Appointment[], dayNumber: number) {
    this.appointments = appointments;
    this.dayNumber = dayNumber;
  }
}
