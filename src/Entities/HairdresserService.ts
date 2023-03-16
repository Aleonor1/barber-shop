import { Column, Double, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class HairdresserService {
  @PrimaryColumn()
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
