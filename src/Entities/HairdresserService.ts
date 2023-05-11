import {
  Column,
  Double,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("hairdresser_service")
export class HairdresserService {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  code: string;

  @Column()
  string: string;

  @Column()
  price: number;

  constructor(code: string, string: string, price: number) {
    this.code = code;
    this.string = string;
    this.price = price;
  }
}
