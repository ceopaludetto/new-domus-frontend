import { InputType, Field } from "@nestjs/graphql";
import { IsEnum, IsString, IsOptional } from "class-validator";

import { Order } from "@/server/utils/common.dto";

@InputType()
export class StateSortArgs {
  @IsOptional()
  @IsEnum(Order)
  @IsString()
  @Field(() => Order, { nullable: true })
  public name?: Order;
}
