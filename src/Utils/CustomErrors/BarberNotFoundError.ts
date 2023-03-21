export class BarberNotFoundError implements Error {
  name: string = "BarberNotFoundError";
  message: string = "Barber was not found!";
  stack?: string;
}
