import type { Type } from "@nestjs/common";
import { InputType, Field, TypeMetadataStorage } from "@nestjs/graphql";
import { IsString, IsEnum, IsOptional } from "class-validator";
import type { Order as SequelizeOrder } from "sequelize";

import { Order, ExcludeSequelize, Sort } from "./common.dto";

export function Sortable<T, K extends string & keyof ExcludeSequelize<T>>(
  model: Type<T>,
  props: readonly K[],
  defaults?: { [P in K]?: Order }
): Type<{ [P in keyof Pick<T, typeof props[number]>]?: Order }> {
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
