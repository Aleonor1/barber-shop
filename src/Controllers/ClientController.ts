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
import jwt from "jsonwebtoken";

@Controller("clients")
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    @Inject(AppointmentRepositoryImpl)
    private readonly appointmentRepository: AppointmentRepositoryImpl
  ) {}

  @Post()
  async create(@Body() body: any, @Res() response: Response) {
    try {
      console.log(body);
      const client = await this.clientsService.create(
        body.firstName,
        body.lastName,
        body.birthday,
        body.email,
        body.password,
        body.username
      );

      response.status(HttpStatus.CREATED).json(client);
    } catch (exception) {
      console.log(exception);
      response.status(HttpStatus.BAD_REQUEST).json(exception.message);
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

  @Post(":id/sendConfirmationLink")
  async sendConfirmationMail(
    @Param("id") id: string,
    @Res() response: Response
  ): Promise<string> {
    try {
      const info = await this.clientsService.sendConfirmationMail(id);
      console.log("a");

      if (info) {
        response.status(HttpStatus.OK).json(info);
        return info;
      } else if (info === undefined) {
        response.status(HttpStatus.NOT_FOUND).json();
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message);
    }
  }

  @Post("login")
  async login(
    @Body() body: { username: string; password: string },
    @Res() response: Response
  ) {
    try {
      const { username, password } = body;

      const client = await this.clientsService.findByAnyField(
        "userName",
        username
      );

      if (!client) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ id: client.id }, "your-secret-key-here", {
        expiresIn: "1h",
      });

      const passwordMatches = password === client.password;
      if (!passwordMatches) {
        response.status(HttpStatus.BAD_REQUEST).json("Invalid credentials");
      }

      response.status(HttpStatus.OK).json({ token: token, user: client });
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message);
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
    } catch (error) {}
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

        response.status(HttpStatus.OK).json(appointments);
        return appointments;
      } else if (client === undefined) {
        response.status(HttpStatus.NOT_FOUND).json();
      } else {
        response.status(HttpStatus.BAD_REQUEST).json();
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message);
    }
  }
}
