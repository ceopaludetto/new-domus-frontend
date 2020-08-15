import type knex from "knex";

import { BLOCK, CONDOMINIUM } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(BLOCK, (t) => {
      defaults(k, t);
      t.string("name").nullable();
      t.integer("number").notNullable();
      t.string("condominium").references("id").inTable(CONDOMINIUM);
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(BLOCK);
  },
};
