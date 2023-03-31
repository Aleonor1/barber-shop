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
import { Barber } from "../Barber";
import { AppointmentStatus } from "@/Utils/AppointmentStatus";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  from: string;

  @Column({ default: 0 })
  price: number;

  @Column()
  to: string;

  @Column({ default: false })
  booked: boolean;

  @OneToOne(() => Client, { cascade: ["insert", "update"] })
  @JoinColumn()
  client: Client;

  @OneToOne(() => HairdresserService, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    cascade: ["insert", "update"],
  })
  @JoinColumn()
  service: HairdresserService;

  @ManyToOne(() => Day, (day) => day.appointments)
  day: Day;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.WAITING_FOR_CONFIRMATION,
  })
  status: AppointmentStatus;

  confirm() {
    this.status = AppointmentStatus.CONFIRMED;
  }

  complete() {
    this.status = AppointmentStatus.COMPLETED;
  }

  cancel() {
    this.status = AppointmentStatus.CANCELLED;
  }

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

  public setPrice(price: number): void {
    this.price = price;
  }
}
