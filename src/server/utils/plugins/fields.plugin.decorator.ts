/* eslint-disable no-undef */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext, TypeMetadataStorage } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import GraphQLFields from "graphql-fields";
import type { IncludeOptions } from "sequelize";

import type { KeepOptions } from "@/server/utils/common.dto";
import { keys as ks } from "@/server/utils/keys";

function map<T>(target: any, fields: { [P in keyof T]: T[P] }): Record<string, any> {
  const res: Record<string, any> = {};

  const metadata = TypeMetadataStorage.getObjectTypeMetadataByTarget(target);
  const entries = Object.entries(fields);

  entries.forEach(([k, v]) => {
    const inner = Object.keys(v as typeof fields);

    if (inner.length) {
      const innerProperty = metadata?.properties?.find((p) => p.name === k);
      const mapped = map(innerProperty?.typeFn(), v as typeof fields);

      res[k] = mapped;
    } else {
      res[k] = {};
    }
  });

  res.keys = () => ks(res, ["keys", "includes"]);
  res.includes = (): IncludeOptions[] => {
    const includes: IncludeOptions[] = [];

    entries.forEach(([k]) => {
      if (Object.keys(res[k]).length) {
        const prop = metadata?.properties?.find((p) => p.name === k);
        includes.push({ model: prop?.typeFn() as any, attributes: res[k].keys(), include: res[k].includes() });
      }
    });

    return includes;
  };

  return res;
}

function mapKeep<T>(fields: Record<string, any>, kp: KeepOptions<T>) {
  Object.entries(kp).forEach(([k, v]) => {
    fields[k] = {};
    if (typeof v === "object") {
      mapKeep(fields[k], v as any);
    }
  });
}

export const MapFields = <T>(target: new () => T, keep?: KeepOptions<T>) =>
  createParamDecorator(
    (data: unknown, context: ExecutionContext): Record<string, any> => {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo<GraphQLResolveInfo>();
      const fields = GraphQLFields(info as any, {}, { excludedFields: ["__typename"] });

      if (keep) {
        mapKeep(fields, keep);
      }

      return map(target, fields);
    }
  )();
