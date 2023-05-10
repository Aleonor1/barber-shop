import { User } from "src/Entities/User";
import { UserBuilder } from "./Builder";
import { BasicAddress } from "src/Utils/Address";
import { Barber } from "src/Entities/Barber";
import { first } from "rxjs";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";
import { Country } from "src/Entities/Country";
import { Year } from "src/Entities/Appointments/Year";
import { Vacation } from "@/Entities/Vacation";

export class BarberBuilderImpl implements UserBuilder {
  public firstName: string;
  public lastName: string;
  public age: number;
  public nationalities: Country[];
  public address: BasicAddress;
  public deletedAt?: Date;
  public experience: ExperienceLevel;
  public email: string;
  public username: string;
  public password: string;
  public year: Year;
  public vacation: Vacation[];
  public description: string;
  public birthdate: Date;

  public setExperience(experience: ExperienceLevel) {
    this.experience = experience;
    return this;
  }

  public setYear(year: Year) {
    this.year = year;
    return this;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
    return this;
  }

  public setPassword(password: string) {
    this.password = password;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
    return this;
  }

  public setUsername(username: string) {
    this.username = username;
    return this;
  }

  public setVacation() {
    this.vacation = new Array<Vacation>();
    return this;
  }

  public setAge(age: number) {
    this.age = age;
    return this;
  }

  public setNationalities(nationalities: Country[]) {
    this.nationalities = nationalities;
    return this;
  }

  public setAddress(address: BasicAddress) {
    this.address = address;
    return this;
  }

  public setDeletedAt(deletedAt: Date) {
    this.deletedAt = deletedAt;
    return this;
  }

  public setEmail(email: string) {
    this.email = email;
    return this;
  }

  build(): Barber {
    return new Barber(
      this.lastName,
      this.firstName,
      this.birthdate,
      this.address,
      this.email,
      this.username,
      this.password,
      this.year,
      this.description,
      this.experience,
      this.nationalities
    );
  }
}
