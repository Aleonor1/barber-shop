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
  Inject,
} from "@nestjs/common";
import { ClientsService } from "../Services/ClientServiceImpl";
import { Client } from "src/Entities/Client";
import { CleintDto } from "src/DTOS/ClientDto.dts";
import { statusEnum } from "src/EmailConfirmation/Status";
import { Response } from "express";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { AppointmentRepositoryImpl } from "src/Repositories/Appointments/AppointmentRepositoryImpls";
import { UpdateClientDto } from "@/DTOS/UpdateClientDto.dts";

@Controller("clients")
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    @Inject(AppointmentRepositoryImpl)
    private readonly appointmentRepository: AppointmentRepositoryImpl
  ) {}

  @Post()
  create(@Body() body: any, @Res() response: Response) {
    try {
      console.log(body);
      const client = this.clientsService.create(
        body.firstName,
        body.lastName,
        body.birthday,
        body.email,
        body.password,
        body.username
      );

      if (client) {
        response.status(HttpStatus.CREATED).json(client).send();
      }
    } catch (exception) {
      console.log(exception);
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Res() response: Response
  ): Promise<Client> {
    try {
      const client = await this.clientsService.findOne(id);

      if (client) {
        response.status(HttpStatus.OK).json(client).send();
        return client;
      } else if (client === undefined) {
        response.status(HttpStatus.NOT_FOUND).json().send();
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Patch(":id")
  async updateClient(
    @Param("id") id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Res() response: Response
  ): Promise<Client> {
    try {
      const updateClient = await this.clientsService.updateClinet(
        id,
        updateClientDto
      );
      return updateClient;
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json(error.message).send();
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() response: Response) {
    try {
      const client = await this.clientsService.deleteClient(id);

      if (client.deletedAt) {
        response.status(HttpStatus.OK).json().send();
      } else if (!client) {
        response.status(HttpStatus.NOT_FOUND).json().send();
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.messages).send();
    }
  }

  @Get("/verify/:userId/:token")
  async verify(
    @Res() response: Response,
    @Param("token") token: string,
    @Param("userId") userId: string
  ) {
    try {
      const client = await this.clientsService.verify(token, userId);

      if (client && client.status === statusEnum.active) {
        response.status(HttpStatus.ACCEPTED).json().send();
      } else if (!client) {
        response.status(HttpStatus.NOT_FOUND).json().send();
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Patch("/restore/:id")
  async restoreSoftDelete(
    @Param("id") id: string,
    @Res() response: Response
  ): Promise<void> {
    try {
      const client = await this.clientsService.restoreSoftDelete(id);

      if (client && !client.deletedAt) {
        response.status(HttpStatus.ACCEPTED).json(client).send();
      } else if (!client) {
        response.status(HttpStatus.NOT_FOUND).json().send();
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }

  @Get(":id/appointments")
  async getAppointments(
    @Param("id") id: string,
    @Res() response: Response
  ): Promise<Appointment[]> {
    try {
      const client = await this.clientsService.findOne(id);

      if (client) {
        const appointments =
          await this.appointmentRepository.getAllClientAppointmnts(id);

        response.status(HttpStatus.OK).json(appointments).send();
        return appointments;
      } else if (client === undefined) {
        response.status(HttpStatus.NOT_FOUND).json().send();
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message).send();
    }
  }
}
