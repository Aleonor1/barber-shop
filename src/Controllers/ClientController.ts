import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ClientsService } from "../Services/ClientServiceImpl";
import { Client } from "src/Entities/Client";
import { CleintDto } from "src/DTOS/ClientDto.dts";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() body: CleintDto) {
    this.clientsService.create(
      body.firstName,
      body.lastName,
      body.age,
      body.street,
      body.city,
      body.country,
      body.postalCode,
      body.addressName,
      body.email,
      body.nationalities
    );
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientsService.update(+id, updateClientDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientsService.deleteBarber(id);
  }

  @Patch("/restore/:id")
  restoreSoftDelete(@Param("id") id: string): void {
    this.clientsService.restoreSoftDelete(id);
  }
}
