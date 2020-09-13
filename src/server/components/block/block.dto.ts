import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString, IsNumber, IsOptional } from "class-validator";

import { IsShortID } from "@/server/utils/validations";

@InputType()
export class BlockInsertInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  public name?: string;

  @IsNumber()
  @Field()
  public number!: number;

  @IsShortID()
  @IsOptional()
  @Field(() => ID, { nullable: true })
  public condominium?: string;
}
