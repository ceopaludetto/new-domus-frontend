/* eslint-disable no-undef */
import { Injectable, PipeTransform } from "@nestjs/common";
import { Info } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";

import { GraphQLFieldsToRelations } from "./fields.to.relation";

@Injectable()
class MapFieldsPipe implements PipeTransform {
  public transform(value: GraphQLResolveInfo) {
    const fields = GraphQLFieldsToRelations(value, { exclude: ["__typename"] });

    return fields;
  }
}

export const MapFields = () => Info(new MapFieldsPipe());
