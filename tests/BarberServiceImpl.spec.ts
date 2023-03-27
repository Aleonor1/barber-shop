import { Test, TestingModule } from "@nestjs/testing";
import { BarberServiceImpl } from "./BarberServiceImpl";
import { BarberRepositoryImpl } from "../Repositories/BarberRepositoryImpl";
import { BasicAddressRepository } from "../Repositories/BasicAddressRepository";
import { CountryRepositoryImpl } from "../Repositories/CountryRepositoryImpl";
import { ClientsService } from "./ClientServiceImpl";
import { AppointmentRepositoryImpl } from "../Repositories/Appointments/AppointmentRepositoryImpls";
import { HairdresserServicesRepositoryImpl } from "../Repositories/HairdresserServicesRepositoryImpl";
import { Barber } from "../Entities/Barber";
import { ExperienceLevel } from "../Utils/ExperienceLevel";
import { Country } from "../Entities/Country";
import { Appointment } from "../Entities/Appointments/Appointment";
import { Day } from "../Entities/Appointments/Day";
import { Month } from "../Entities/Appointments/Month";
import { Year } from "../Entities/Appointments/Year";
import { AppointmentNotFoundError } from "../Utils/CustomErrors/AppointmentNotFoundError";
import { BarberNotFoundError } from "../Utils/CustomErrors/BarberNotFoundError";
import { ClientNotFoundError } from "../Utils/CustomErrors/ClientNotFoundError";

describe("BarberServiceImpl", () => {
  let service: BarberServiceImpl;
  const mockBarberRepository = {
    findById: jest.fn(),
    createOrUpdate: jest.fn(),
    getAllBarbers: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    restoreSoftDelete: jest.fn(),
  };
  const mockBasicAddressRepository = {
    handleAddress: jest.fn(),
  };
  const mockCountryRepository = {
    findById: jest.fn(),
  };
  const mockClientsService = {
    getClientById: jest.fn(),
  };
  const mockAppointmentRepository = {
    findById: jest.fn(),
    getAllAppointments: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };
  const mockHairdresserServicesRepository = {
    getAllHairdresserServices: jest.fn(),
    createOrUpdate: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarberServiceImpl,
        {
          provide: BarberRepositoryImpl,
          useValue: mockBarberRepository,
        },
        {
          provide: BasicAddressRepository,
          useValue: mockBasicAddressRepository,
        },
        {
          provide: CountryRepositoryImpl,
          useValue: mockCountryRepository,
        },
        {
          provide: ClientsService,
          useValue: mockClientsService,
        },
        {
          provide: AppointmentRepositoryImpl,
          useValue: mockAppointmentRepository,
        },
        {
          provide: HairdresserServicesRepositoryImpl,
          useValue: mockHairdresserServicesRepository,
        },
      ],
    }).compile();

    service = module.get<BarberServiceImpl>(BarberServiceImpl);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getBarberById", () => {
    it("should return the barber with the given id", async () => {
      const expectedBarber: Barber = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 30,
        email: "johndoe@example.com",
        username: "johndoe",
        password: "password",
        address: {
          street: "123 Main St",
          city: "Anytown",
          country: "US",
          postalCode: "12345",
        },
        experience: ExperienceLevel.JUN,
      };
    });
  });
});
