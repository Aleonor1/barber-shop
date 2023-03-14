import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  GoneException,
  UseGuards,
} from "@nestjs/common";
import { ClientsService } from "../Services/ClientServiceImpl";
import { Client } from "src/Entities/Client";
import { CleintDto } from "src/DTOS/ClientDto.dts";
import { statusEnum } from "src/EmailConfirmation/Status";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() body: CleintDto, @Res() response: Response) {
    const client = this.clientsService.create(
      body.firstName,
      body.lastName,
      body.age,
      body.street,
      body.city,
      body.country,
      body.postalCode,
      body.addressName,
      body.email,
      body.nationalities,
      body.username,
      body.password
    );

    if (client) {
      response.status(HttpStatus.CREATED).json(client).send();
    } else {
      response.status(HttpStatus.BAD_REQUEST).json().send();
    }
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Res() response: Response) {
    const client = this.clientsService.findOne(id);

    if (client) {
      response.status(HttpStatus.OK).json(client).send();
    } else if (client === undefined) {
      response.status(HttpStatus.NOT_FOUND).json().send();
    } else {
      response.status(HttpStatus.BAD_REQUEST).json().send();
    }
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() body: Body) {
  //   this.clientsService.update(id, body);
  // }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() response: Response) {
    const client = await this.clientsService.deleteBarber(id);

    if (client.deletedAt) {
      response.status(HttpStatus.OK).json().send();
    } else if (!client) {
      response.status(HttpStatus.NOT_FOUND).json().send();
    }
  }

  @Get("/verify/:userId/:token")
  async verify(
    @Res() response: Response,
    @Param("token") token: string,
    @Param("userId") userId: string
  ) {
    const client = await this.clientsService.verify(token, userId);

    if (client && client.status === statusEnum.active) {
      response.status(HttpStatus.ACCEPTED).json().send();
    } else if (!client) {
      response.status(HttpStatus.NOT_FOUND).json().send();
    } else {
      response.status(HttpStatus.BAD_REQUEST).json().send();
    }
  }

  @Patch("/restore/:id")
  async restoreSoftDelete(
    @Param("id") id: string,
    @Res() response: Response
  ): Promise<void> {
    const client = await this.clientsService.restoreSoftDelete(id);

    if (client && !client.deletedAt) {
      response.status(HttpStatus.ACCEPTED).json(client).send();
    } else {
      response.status(HttpStatus.BAD_REQUEST).json().send();
    }
  }
}
