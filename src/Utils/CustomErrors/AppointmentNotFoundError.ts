export class AppointmentNotFoundError implements Error {
  name: string = "AppointmentNotFoundError";
  message: string = "Appointment was not found!";
  stack?: string;
}
