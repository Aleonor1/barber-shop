import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BasicAddress {
  @Column()
  @PrimaryGeneratedColumn()
  addressId: string;

  @Column()
  name?: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  constructor(
    street: string,
    city: string,
    country: string,
    postalCode: string,
    name?: string
  ) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
  }
}
