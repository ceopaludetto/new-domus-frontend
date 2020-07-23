import { Type, Injectable, PipeTransform } from "@nestjs/common";
import { InputType, Field, TypeMetadataStorage, Args } from "@nestjs/graphql";
import { IsString, IsEnum, IsOptional } from "class-validator";
import type { Order as SequelizeOrder } from "sequelize";

import { Order, ExcludeSequelize, Sort } from "../common.dto";

export function Sortable<T, K extends string & keyof ExcludeSequelize<T>>(
  model: Type<T>,
  props: readonly K[],
  defaults?: { [P in K]?: Order }
): Type<{ [P in keyof Pick<T, typeof props[number]>]?: Order } & { get(): SequelizeOrder }> {
  @InputType(`${model.name}SortInput`, { isAbstract: true })
  abstract class AbstractSort {}

  props.forEach((p) => {
    IsOptional()(AbstractSort.prototype, p);
    IsString()(AbstractSort.prototype, p);
    IsEnum(Order)(AbstractSort.prototype, p);
    Field(() => Order, { nullable: true, defaultValue: defaults?.[p] })(AbstractSort.prototype, p);
  });

  return AbstractSort as any;
}

export function getSort<T>(model: Type<T>, sort?: Sort<T, keyof T>): SequelizeOrder | undefined {
  if (sort) {
    const metadata = TypeMetadataStorage.getObjectTypeMetadataByTarget(model);
    const entries = Object.entries<any>(sort);
    const order: any[][] = [];

    entries.forEach(([k, v]) => {
      if (typeof v === "object") {
        const nest = metadata?.properties?.find((x) => x.name === k);
        const target = nest?.typeFn();
        if (target) {
          const content = getSort(target as any, v);

          if (content) {
            order.push([{ model: target, as: nest?.name }, ...((content as []).flat() as any)]);
          }
        }
      } else {
        order.push([k, v]);
      }
    });

    return order as SequelizeOrder;
  }

  return undefined;
}

@Injectable()
class SequelizeOrderPipe<T> implements PipeTransform {
  public constructor(private readonly model: Type<T>) {}

  public transform(value: Sort<T, keyof T>) {
    return { get: () => getSort(this.model, value) };
  }
}

export const SortFields = <T>(model: Type<T>) => Args("sort", { nullable: true }, new SequelizeOrderPipe(model));
