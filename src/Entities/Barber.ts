import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "./Country";
import { Year } from "./Appointments/Year";
import { HairdresserService } from "./HairdresserService";
import { Appointment } from "./Appointments/Appointment";

@Entity()
export class Barber extends User {
  @Column({
    type: "enum",
    enum: ExperienceLevel,
    default: ExperienceLevel.JUNIOR,
  })
  experience: ExperienceLevel;

  @OneToOne(() => Year, {
    cascade: ["insert", "update"],
  })
  @JoinColumn()
  year: Year;

  constructor(
    lastName: string,
    firstName: string,
    age: number,
    address: BasicAddress,
    email: string,
    username: string,
    password: string,
    year: Year,
    experience?: ExperienceLevel,
    nationalities?: Country[]
  ) {
    super(
      lastName,
      firstName,
      age,
      nationalities,
      address,
      email,
      username,
      password
    );
    this.experience = experience;
    this.year = year;
  }

  public getAppointment(
    monthAsNumber: number,
    dayAsNumber: number,
    from: string,
    to: string
  ): Appointment {
    const month = this.year.months.find(
      (findMonth) => findMonth.monthNumber === monthAsNumber
    );

    const day = month.days.find((findDay) => {
      return findDay.dayNumber == dayAsNumber;
    });

    const appointment = day.appointments.find((appointment) => {
      return appointment.from == from && appointment.to == to;
    });

    return appointment;
  }
}
