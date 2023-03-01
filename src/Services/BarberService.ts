import { Barber } from "src/Entities/Barber";

export interface BarberService {
  getBarberById(id: string): Promise<Barber>;
}
