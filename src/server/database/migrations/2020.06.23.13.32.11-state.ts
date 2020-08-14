import type knex from "knex";

import { STATE } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(STATE, (t) => {
      defaults(k, t);
      t.string("name").notNullable();
      t.string("initials").notNullable().unique();
      t.integer("code").notNullable().unique();
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(STATE);
  },
};
