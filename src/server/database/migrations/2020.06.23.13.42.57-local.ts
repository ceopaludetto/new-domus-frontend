import type knex from "knex";

import { LOCAL, CONDOMINIUM, BLOCK } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(LOCAL, (t) => {
      defaults(k, t);
      t.string("name").notNullable();
      t.string("description").nullable();
      t.integer("capacity").notNullable();
      t.string("image").nullable();
      t.string("block").references("id").inTable(BLOCK);
      t.string("condominium").references("id").inTable(CONDOMINIUM);
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(LOCAL);
  },
};
