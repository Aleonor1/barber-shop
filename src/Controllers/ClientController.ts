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

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() body) {
    this.clientsService.create(
      body.firstName,
      body.lastName,
      body.age,
      body.street,
      body.city,
      body.country,
      body.postalCode,
      body.experience,
      body.addressName
    );
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(+id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientsService.update(+id, updateClientDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientsService.remove(+id);
  }
}
