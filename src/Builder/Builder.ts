import { BasicAddress } from "src/Utils/Address";
import { Country } from "src/Utils/Countries";

export interface UserBuilder {
  firstName: string;
  lastName: string;
  age: number;
  nationality: Country;
  address: BasicAddress;
  deletedAt?: Date;
}
