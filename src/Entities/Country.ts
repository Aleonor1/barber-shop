import { Column, Entity, PrimaryColumn } from "typeorm";
import countries from "../Utils/countries.json";
import { Inject } from "@nestjs/common";

@Entity()
export class Country {
  @Column()
  public name: string;

  @Column()
  @PrimaryColumn()
  public code: string;
}
