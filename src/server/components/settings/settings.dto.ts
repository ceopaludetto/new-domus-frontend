import { InputType, Field } from "@nestjs/graphql";
import { IsEnum, IsString, IsOptional } from "class-validator";

import { Theme } from "@/server/utils/enums";

@InputType()
export class SettingsInsertInput {
  @Field(() => Theme)
  @IsEnum(Theme)
  @IsString()
  @IsOptional()
  public theme: Theme = Theme.DARK;
}
