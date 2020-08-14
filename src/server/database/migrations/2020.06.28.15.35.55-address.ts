import type knex from "knex";

import { ADDRESS, CITY, CONDOMINIUM } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(ADDRESS, (t) => {
      defaults(k, t);
      t.string("zip", 8).notNullable();
      t.string("address").notNullable();
      t.string("number").notNullable();
      t.string("city").references("id").inTable(CITY);
      t.string("condominium").references("id").inTable(CONDOMINIUM);
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(ADDRESS);
  },
};
