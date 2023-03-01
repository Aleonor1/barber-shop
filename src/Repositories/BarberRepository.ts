import { Injectable } from "nestjs-injectable";
import { User } from "../entities/User";
import { UserRepository } from "./UserRepository";
import { Barber } from "src/Entities/Barber";

export const BARBER_REPOSITORY = "BARBER-REPOSITORY-IMPL";

export interface BarberRepository extends UserRepository {
  saveBarber(barber: Barber): Promise<void>;
}
