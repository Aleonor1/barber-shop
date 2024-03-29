import { User } from "src/Entities/User";
import { UserBuilder } from "./Builder";
import { BasicAddress } from "src/Utils/Address";
import { Client } from "src/Entities/Client";
import { Country } from "src/Entities/Country";
import { statusEnum } from "src/EmailConfirmation/Status";

export class ClientBuilderImpl implements UserBuilder {
  public firstName: string;
  public lastName: string;
  public birthdate: Date;
  public nationalities: Country[];
  public address: BasicAddress;
  public deletedAt?: Date;
  public fidelityLevel: number;
  public email: string;
  public token: string;
  public status: string;
  public username: string;
  public password: string;

  public setPassword(password: string) {
    this.password = password;
    return this;
  }

  public setStatus(status: statusEnum) {
    this.status = status;
    return this;
  }

  public setFidelityLevel(fidelityLevel: number) {
    this.fidelityLevel = fidelityLevel;
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

  public setBirthdate(birthdate: Date) {
    this.birthdate = birthdate;
    return this;
  }

  public setToken(token: string) {
    this.token = token;
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

  public setEmail(email: string) {
    this.email = email;
    return this;
  }

  public setDeletedAt(deletedAt: Date) {
    this.deletedAt = deletedAt;
    return this;
  }

  public setUsername(username: string) {
    this.username = username;
    return this;
  }

  build(): Client {
    return new Client(
      this.lastName,
      this.firstName,
      this.birthdate,
      this.address,
      this.email,
      this.token,
      this.username,
      this.password,
      this.nationalities
    );
  }
}
