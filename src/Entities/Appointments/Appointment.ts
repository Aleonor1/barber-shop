import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "../Client";
import { Day } from "./Day";
import { BarberService } from "../BarberService";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ default: false })
  booked: boolean;

  @OneToOne(() => Client)
  client: Client;

  @OneToOne(() => BarberService)
  service: BarberService;

  @ManyToOne(() => Day, (day) => day.appointments)
  day: Day;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }
}
