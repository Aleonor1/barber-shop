import { Inject, Injectable } from "@nestjs/common";
import { Barber } from "./Entities/Barber";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
