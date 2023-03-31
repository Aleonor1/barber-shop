// @ts-nocheck

import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { BarberServiceImpl } from "src/Services/BarberServiceImpl";
import { Barber } from "src/Entities/Barber";
import { UpdateBarberDto } from "src/DTOS/UpdateBarberDto.dts";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { OptionalDayAndMonthQueryParams } from "src/Utils/QueryParams/OptionalDayAndMonthQueryParam";
import { DayAndMonthQueryParams } from "src/Utils/QueryParams/DayAndMonthQueryParam";
import { BarberController } from "@/Controllers/BarberController";
import { Response } from "express";
import { ExperienceLevel } from "@/Utils/ExperienceLevel";
describe("BarberController", () => {
  let app: INestApplication;
  let barberService = {
    getAllBarbers: jest.fn(),
    getBarberById: jest.fn(),
    verifyAppointment: jest.fn(),
    create: jest.fn(),
    updateBarber: jest.fn(),
    deleteBarber: jest.fn(),
    restoreSoftDelete: jest.fn(),
    getAllAppointmentsForBarber: jest.fn(),
    getFreeAppointmentsForBarberOnDay: jest.fn(),
  };
  const barberId = "1";
  const appointmentId = "2";

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BarberController],
      providers: [
        {
          provide: BarberServiceImpl,
          useValue: barberService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("BarberController", () => {
    let barberController: BarberController;
    let barberService: BarberServiceImpl;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        controllers: [BarberController],
        providers: [
          {
            provide: BarberServiceImpl,
            useValue: {
              getAllBarbers: jest.fn(),
            },
          },
        ],
      }).compile();

      barberController = moduleRef.get<BarberController>(BarberController);
      barberService = moduleRef.get<BarberServiceImpl>(BarberServiceImpl);
    });

    describe("getAllBarbers", () => {
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      it("should return all barbers with status code 200", async () => {
        const mockBarbers = [
          [
            {
              firstName: "Larson",
              lastName: "Camilla",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Lionel_Fahey58@yahoo.com",
              username: "Gage_Hegmann",
              password: "HF9kDGhCkwauAP6",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: "7",
              deletedAt: null,
            },
            {
              firstName: "Beahan",
              lastName: "Malika",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Alejandra.Gorczany14@yahoo.com",
              username: "Kory.Strosin",
              password: "DKw0QPjk9Va5qjx",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: "8",
              deletedAt: null,
              vacations: [],
            },
            {
              firstName: "Hackett",
              lastName: "Claire",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Moses67@gmail.com",
              username: "Merl87",
              password: "b1RHont_zH6xR8M",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: "9",
              deletedAt: null,
            },
            {
              firstName: "Jenkins",
              lastName: "Woodrow",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Edyth17@yahoo.com",
              username: "Greta.McDermott",
              password: "i3Dq_Am9WyvfdXz",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: "14",
              deletedAt: null,
            },
            {
              firstName: "Purdy",
              lastName: "Aida",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Wyatt91@gmail.com",
              username: "Modesto_Paucek",
              password: "L128V5rAa3iKw7t",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: "23",
              deletedAt: null,
            },
            {
              firstName: "Nader",
              lastName: "Kim",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Abdullah_Kirlin44@gmail.com",
              username: "Casandra_Hilpert",
              password: "b6X7jST3ADwWBEM",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: "24",
              deletedAt: null,
            },
            {
              firstName: "Heller",
              lastName: "Olaf",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Maxwell_White@gmail.com",
              username: "Blanche52",
              password: "51pf3nvKLT_ZUav",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: 25,
              deletedAt: null,
            },
            {
              firstName: "Jacobs",
              lastName: "Zachery",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Amiya_Jerde@hotmail.com",
              username: "Cleora81",
              password: "7Yn78rnAQ4Vf8kj",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: 27,
              deletedAt: null,
            },
            {
              firstName: "Schimmel",
              lastName: "Jerald",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Zoey.Hirthe@hotmail.com",
              username: "Joshua.Frami",
              password: "0uyvcaH58iFovmd",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: 28,
              deletedAt: null,
            },
            {
              firstName: "Prosacco",
              lastName: "Eudora",
              age: 36,
              nationalities: undefined,
              address: undefined,
              email: "Daisy_Roberts@hotmail.com",
              username: "Everette9",
              password: "rV82GzeBVnPSim4",
              experience: ExperienceLevel.JUNIOR,
              year: undefined,
              id: 29,
              deletedAt: null,
            },
          ],
          10,
        ];
        jest
          .spyOn(barberService, "getAllBarbers")
          .mockResolvedValue(mockBarbers);

        const result = await barberController.getAllBarbers(
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
        expect(mockResponse.json).toHaveBeenCalledWith(mockBarbers[0]);
        expect(mockResponse.send).toHaveBeenCalled();
        expect(result).toEqual(mockBarbers);
      });

      it("should return status code 204 if no barbers are found", async () => {
        const mockBarbers: [Barber[], number] = [[], 0];
        jest
          .spyOn(barberService, "getAllBarbers")
          .mockResolvedValue(mockBarbers);

        const result = await barberController.getAllBarbers(
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalled();
        expect(result).toEqual(mockBarbers);
      });

      it("should return status code 204 if barbers is undefined", async () => {
        const mockBarbers: [Barber[], number] = [undefined, undefined];
        jest
          .spyOn(barberService, "getAllBarbers")
          .mockResolvedValue(mockBarbers);

        await barberController.getAllBarbers(mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalled();
      });

      it("should return status code 400 if an exception is thrown", async () => {
        jest
          .spyOn(barberService, "getAllBarbers")
          .mockRejectedValue(new Error());

        await barberController.getAllBarbers(mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(
          HttpStatus.BAD_REQUEST
        );
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalled();
      });
    });
  });
});
