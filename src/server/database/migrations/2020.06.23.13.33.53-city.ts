import type knex from "knex";

import { CITY, STATE } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(CITY, (t) => {
      defaults(k, t);
      t.string("name").notNullable();
      t.string("slug").notNullable();
      t.integer("code").notNullable().unique();
      t.string("state").references("id").inTable(STATE).notNullable();
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(CITY);
  },
};
