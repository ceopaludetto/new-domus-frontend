import { InputType, Field, ID } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsString, MaxLength } from "class-validator";

import { removeMask } from "@/server/utils/number";
import { IsShortID } from "@/server/utils/validations";
import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class AddressInsertInput {
  @Field()
  @IsString({ message: Messages.STRING })
  @MaxLength(8, { message: Messages.MAX_LENGTH })
  @Transform(removeMask)
  public cep!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  public address!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  public number!: string;

  @Field(() => ID)
  @IsString({ message: Messages.STRING })
  @IsShortID()
  public cityID!: string;
}
