import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "../Client";
import { Day } from "./Day";
import { HairdresserService } from "../HairdresserService";

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
  @JoinColumn()
  client: Client;

  @OneToOne(() => HairdresserService, {
    cascade: ["insert", "update"],
  })
  @JoinColumn()
  service: HairdresserService;

  @ManyToOne(() => Day, (day) => day.appointments)
  day: Day;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  public setService(service: HairdresserService): void {
    this.service = service;
  }

  public setClient(client: Client): void {
    this.client = client;
  }

  public setBooked(booked: boolean): void {
    this.booked = booked;
  }
}
