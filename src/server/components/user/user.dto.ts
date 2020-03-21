import { InputType, Field } from "@nestjs/graphql";
import { IsString, ValidateNested } from "class-validator";

import { PersonInput } from "@/server/components/person";

@InputType()
export class UserInput {
  @IsString()
  @Field()
  public login!: string;

  @IsString()
  @Field()
  public password!: string;

  @ValidateNested()
  @Field(() => PersonInput)
  public person!: PersonInput;
}
