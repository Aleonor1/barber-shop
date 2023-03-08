import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CountryRepositoryImpl } from "./Repositories/CountryRepositoryImpl";
import countrties from "./Utils/countries.json";
@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject(CountryRepositoryImpl)
    private readonly countryRepositoryImpl: CountryRepositoryImpl
  ) {}
  async onModuleInit() {
    await this.initCountries();
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

  getHello(): string {
    return "Hello World!";
  }
}
