import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/api/user/user.dto";

export class CredentialsDto extends PickType(CreateUserDto, ['email', 'password']) { }