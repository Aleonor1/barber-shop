export class ClientNotFoundError implements Error {
  name: string = "ClientNotFoundError";
  message: string = "Client was not found";
  stack?: string;
}
