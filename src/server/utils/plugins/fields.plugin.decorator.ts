/* eslint-disable no-undef */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext, TypeMetadataStorage } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import GraphQLFields from "graphql-fields";
import type { IncludeOptions, Model } from "sequelize";

import { keys as ks } from "@/server/utils/keys";

function map<T>(target: any, fields: { [P in keyof T]: T[P] }): Record<string, any> {
  const res: Record<string, any> = {};

  const metadata = TypeMetadataStorage.getObjectTypeMetadataByTarget(target);
  const keys = Object.keys(fields);

  keys.forEach((k: string) => {
    const inner = Object.keys(fields[k as keyof T]);

    if (inner.length) {
      const innerProperty = metadata?.properties?.find((p) => p.name === k);
      const mapped = map(innerProperty?.typeFn(), fields[k as keyof T]);

      res[k] = mapped;
    } else {
      res[k] = {};
    }
  });

  res.keys = () => ks(res, ["keys", "includes"]);
  res.includes = (): IncludeOptions[] => {
    const includes: IncludeOptions[] = [];

    keys.forEach((k: string) => {
      if (Object.keys(res[k]).length) {
        const prop = metadata?.properties?.find((p) => p.name === k);
        includes.push({ model: prop?.typeFn() as any, attributes: res[k].keys(), include: res[k].includes() });
      }
    });

    return includes;
  };

  return res;
}

export const MapFields = <T>(target: new () => T, keep?: (keyof Omit<T, keyof Model<T>>)[]) =>
  createParamDecorator(
    (data: unknown, context: ExecutionContext): Record<string, any> => {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo<GraphQLResolveInfo>();
      const fields = GraphQLFields(info);

      if (keep) {
        keep.forEach((k) => {
          fields[k] = {};
        });
      }

      return map(target, fields);
    }
  )();
