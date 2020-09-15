import type { FindOptions } from "@mikro-orm/core";
import { Type, Injectable, PipeTransform } from "@nestjs/common";
import { InputType, Field, Args } from "@nestjs/graphql";
import { classToPlain } from "class-transformer";
import { IsString, IsEnum, IsOptional } from "class-validator";

import { Sort, Order } from "../common.dto";
import * as Messages from "../validations/messages";

export function Sortable<T, K extends string & keyof T>(
  model: Type<T>,
  props: readonly K[],
  defaults?: { [P in K]?: Order }
): Type<{ [P in keyof Pick<T, typeof props[number]>]?: Order } & { get(): FindOptions<T>["orderBy"] }> {
  @InputType(`${model.name}SortInput`, { isAbstract: true })
  abstract class AbstractSort {}

  props.forEach((p) => {
    IsOptional()(AbstractSort.prototype, p);
    IsString({ message: Messages.STRING })(AbstractSort.prototype, p);
    IsEnum(Order)(AbstractSort.prototype, p);
    Field(() => Order, { nullable: true, defaultValue: defaults?.[p] })(AbstractSort.prototype, p);
  });

  return AbstractSort as any;
}

@Injectable()
class OrderPipe implements PipeTransform {
  public transform(value: Sort<any, any>) {
    return classToPlain(value);
  }
}

export const SortFields = (type: () => any) => Args({ name: "sort", type, nullable: true }, new OrderPipe());
