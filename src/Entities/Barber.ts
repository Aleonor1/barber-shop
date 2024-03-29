import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "./Country";
import { Year } from "./Appointments/Year";
import { HairdresserService } from "./HairdresserService";
import { Appointment } from "./Appointments/Appointment";
import { Vacation } from "./Vacation";

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

  @Column({ default: "" })
  description: string;

  @OneToMany(() => Vacation, (vacation) => vacation.barber, {
    cascade: ["insert", "update"],
  })
  @JoinColumn()
  vacations: Vacation[];

  constructor(
    lastName: string,
    firstName: string,
    birthdate: Date,
    address: BasicAddress,
    email: string,
    username: string,
    password: string,
    year: Year,
    description: string,
    experience?: ExperienceLevel,
    nationalities?: Country[]
  ) {
    super(
      lastName,
      firstName,
      birthdate,
      nationalities,
      address,
      email,
      username,
      password
    );
    this.experience = experience;
    this.year = year;
    this.description = description;
  }

  public getAppointment(
    monthAsNumber: number,
    dayAsNumber: number,
    from: string
  ): Appointment {
    const month = this?.year?.months?.find(
      (findMonth) => findMonth.monthNumber === monthAsNumber
    );

    const day = month?.days.find((findDay) => {
      return findDay.dayNumber == dayAsNumber;
    });

    const appointment = day.appointments.find((appointment) => {
      return appointment.from == from;
    });

    return appointment;
  }

  public getVacations(): Vacation[] {
    return this.vacations;
  }

  public addVacations(vacationsToAdd: Vacation): void {
    this.vacations.push(vacationsToAdd);
  }

  public hasVacation(date: Date): boolean {
    // check if date is within any of the barber's vacations
    return this.vacations.some(
      (vacation) => date >= vacation.startDate && date <= vacation.endDate
    );
  }

  public toString(): string {
    return `Barber: 
    Last Name : ${this.lastName}
    First Name: ${this.firstName}
    Age: ${this.birthdate}, 
    Username: ${this.userName}, 
    Experience: ${this.experience}, 
    Nationalities: ${this.nationalities}`;
  }
}
