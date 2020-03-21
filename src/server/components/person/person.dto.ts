import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsEmail, IsEnum } from "class-validator";

import { Gender } from "@/server/models/person.model";

@InputType()
export class PersonInput {
  @Field()
  @IsString()
  public name!: string;

  @Field()
  @IsEmail()
  public email!: string;

  @Field(() => Gender)
  @IsString()
  @IsEnum(Gender)
  public gender!: Gender;
}
