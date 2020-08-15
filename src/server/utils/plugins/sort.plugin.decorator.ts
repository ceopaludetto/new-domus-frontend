import { QueryOrder, FindOptions } from "@mikro-orm/core";
import { Type, Injectable, PipeTransform } from "@nestjs/common";
import { InputType, Field, Args } from "@nestjs/graphql";
import { classToPlain } from "class-transformer";
import { IsString, IsEnum, IsOptional } from "class-validator";

import type { Sort } from "../common.dto";
import * as Messages from "../validations/messages";

export function Sortable<T, K extends string & keyof T>(
  model: Type<T>,
  props: readonly K[],
  defaults?: { [P in K]?: QueryOrder }
): Type<{ [P in keyof Pick<T, typeof props[number]>]?: QueryOrder } & { get(): FindOptions<T>["orderBy"] }> {
  @InputType(`${model.name}SortInput`, { isAbstract: true })
  abstract class AbstractSort {}

  props.forEach((p) => {
    IsOptional()(AbstractSort.prototype, p);
    IsString({ message: Messages.STRING })(AbstractSort.prototype, p);
    IsEnum(QueryOrder)(AbstractSort.prototype, p);
    Field(() => QueryOrder, { nullable: true, defaultValue: defaults?.[p] })(AbstractSort.prototype, p);
  });

  return AbstractSort as any;
}

@Injectable()
class OrderPipe<T> implements PipeTransform {
  public constructor(private readonly model: Type<T>) {}

  public transform(value: Sort<T, keyof T>) {
    return { get: () => classToPlain(value) };
  }
}

export const SortFields = <T>(model: Type<T>) => Args("sort", { nullable: true }, new OrderPipe(model));
