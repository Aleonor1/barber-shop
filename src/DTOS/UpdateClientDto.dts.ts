import { PartialType } from "@nestjs/mapped-types";
import { CleintDto } from "./ClientDto.dts";

export class UpdateClientDto extends PartialType(CleintDto) {}
