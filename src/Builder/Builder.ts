import { Country } from "src/Entities/Country";
import { BasicAddress } from "src/Utils/Address";

export interface UserBuilder {
  firstName: string;
  lastName: string;
  birthdate: Date;
  nationalities: Country[];
  address: BasicAddress;
  deletedAt?: Date;
}
