import type knex from "knex";

import { CONDOMINIUM } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(CONDOMINIUM, (t) => {
      defaults(k, t);
      t.string("companyName").notNullable();
      t.string("cnpj", 14).notNullable();
      t.string("character", 1).defaultTo("#").notNullable();
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(CONDOMINIUM);
  },
};
