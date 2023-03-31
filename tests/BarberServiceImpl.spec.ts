import { Test, TestingModule } from "@nestjs/testing";
import { BarberServiceImpl } from "../src/Services/BarberServiceImpl";
import { BarberRepositoryImpl } from "../src/Repositories/BarberRepositoryImpl";
import { BasicAddressRepository } from "../src/Repositories/BasicAddressRepository";
import { CountryRepositoryImpl } from "../src/Repositories/CountryRepositoryImpl";
import { ClientsService } from "../src/Services/ClientServiceImpl";
import { AppointmentRepositoryImpl } from "../src/Repositories/Appointments/AppointmentRepositoryImpls";
import { HairdresserServicesRepositoryImpl } from "../src/Repositories/HairdresserServicesRepositoryImpl";
import { Barber } from "../src/Entities/Barber";
import { ExperienceLevel } from "../src/Utils/ExperienceLevel";
import { BasicAddress } from "@/Utils/Address";
import { Vacation } from "@/Entities/Vacation";
import { ci } from "jest.config";

describe("BarberServiceImpl", () => {
  let service: BarberServiceImpl;
  let repository: BarberRepositoryImpl;

  const mockBarberRepository = {
    findById: jest.fn(),
    createOrUpdate: jest.fn(),
    getAllBarbers: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    restoreSoftDelete: jest.fn(),
  };

  const mockBarberService = {
    handleAppointments: jest.fn(),
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

  const mockCountryRepositoryImpl = {
    findById: jest.fn(),
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

  it("Service should be defined", () => {
    expect(service).toBeDefined();
  });

  const BarberServiceImpl = require("./BarberServiceImpl");

  jest.mock("./BarberServiceImpl");

  describe("createBarber", () => {
    it("should create a new barber", async () => {
      const mockBarber = {
        id: "123",
        name: "John Doe",
        specialty: "Haircut",
        availability: "Mondays and Wednesdays",
        rating: 4.5,
      };

      // Mock the implementation of BarberServiceImpl.createBarber()
      BarberServiceImpl.createBarber.mockResolvedValue(mockBarber);

      // Call the createBarber function
      const newBarber = await BarberServiceImpl.createBarber(mockBarber);

      // Assertions
      expect(newBarber).toEqual(mockBarber);
      expect(BarberServiceImpl.createBarber).toHaveBeenCalledTimes(1);
    });
  });
});
