import { Injectable } from "nestjs-injectable";
import { User } from "../entities/User";

export interface UserRepository {
  findById(id: string): Promise<User>;
}
