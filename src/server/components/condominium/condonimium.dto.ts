import { InputType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsString, MaxLength } from "class-validator";

import { removeMask } from "@/server/utils/number";
import { IsCNPJ } from "@/server/utils/validations/is.cnpj";
import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class CondominiumInsertInput {
  @IsString({ message: Messages.STRING })
  @Field()
  public companyName!: string;

  @IsCNPJ()
  @Transform(removeMask)
  @IsString({ message: Messages.STRING })
  @MaxLength(14, { message: Messages.MAX_LENGTH })
  @Field()
  public cnpj!: string;

  @IsString({ message: Messages.STRING })
  @MaxLength(1, { message: Messages.MAX_LENGTH })
  @Field()
  public character!: string;
}
