import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./User";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "./Country";
import { Year } from "./Appointments/Year";

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

  public setAppointment(
    monthAsNumber: number,
    dayAsNumber: number,
    from: string
  ) {
    const month = this.year.months.find(
      (findMonth) => findMonth.monthNumber === monthAsNumber
    );

    const day = month.days.find((findDay) => {
      findDay.dayNumber === dayAsNumber;
    });

    console.log(day);
  }
}
