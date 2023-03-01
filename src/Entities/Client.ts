import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Client extends User {
  @Column()
  fidelityLevel: number;
}
