import { InputType, Field } from "@nestjs/graphql";
import { IsOptional, ValidateNested } from "class-validator";

import { CitySortInput } from "@/server/components/city/city.dto";
import { State } from "@/server/models";
import { Sortable } from "@/server/utils/sort";

@InputType()
export class StateSortInput extends Sortable(State, ["name"]) {
  @IsOptional()
  @ValidateNested()
  @Field(() => CitySortInput, { nullable: true })
  public cities?: CitySortInput;
}
