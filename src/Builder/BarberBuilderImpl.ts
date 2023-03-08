import { User } from "src/Entities/User";
import { UserBuilder } from "./Builder";
import { BasicAddress } from "src/Utils/Address";
import { Country } from "src/Utils/Countries";
import { Barber } from "src/Entities/Barber";
import { first } from "rxjs";
import { ExperienceLevel } from "src/Utils/ExperienceLevel";

export class BarberBuilderImpl implements UserBuilder {
  public firstName: string;
  public lastName: string;
  public age: number;
  public nationality: Country;
  public address: BasicAddress;
  public deletedAt?: Date;
  public experience: ExperienceLevel;

  public setExperience(experience: ExperienceLevel) {
    this.experience = experience;
    return this;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
    return this;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
    return this;
  }

  public setAge(age: number) {
    this.age = age;
    return this;
  }

  public setNationality(nationality: Country) {
    this.nationality = nationality;
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

  build(): Barber {
    return new Barber(
      this.lastName,
      this.firstName,
      this.age,
      this.address,
      this.experience,
      this.nationality
    );
  }
}
