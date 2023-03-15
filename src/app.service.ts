import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CountryRepositoryImpl } from "./Repositories/CountryRepositoryImpl";
import countrties from "./Utils/countries.json";
import { HairdresserServicesRepositoryImpl } from "./Repositories/HairdresserServicesRepositoryImpl";
import hairdresserServices from "./Utils/HairdDressingServices.json";
@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject(CountryRepositoryImpl)
    private readonly countryRepositoryImpl: CountryRepositoryImpl,
    @Inject(HairdresserServicesRepositoryImpl)
    private readonly hairdresserServicesRepository: HairdresserServicesRepositoryImpl
  ) {}
  async onModuleInit() {
    await this.initCountries();
    await this.initBarberServices();
  }

  private async initCountries() {
    for (let index = 0; index < countrties.length; index++) {
      await this.countryRepositoryImpl.uploadCountry(
        countrties[index].name,
        countrties[index].code
      );
    }
    console.log("Countries are updated!");
  }

  private async initBarberServices() {
    for (let index = 0; index < hairdresserServices.length; index++) {
      await this.hairdresserServicesRepository.uploadHairdresserService(
        hairdresserServices[index].string,
        hairdresserServices[index].code,
        hairdresserServices[index].price
      );
    }
  }

  getHello(): string {
    return "Hello World!";
  }
}
