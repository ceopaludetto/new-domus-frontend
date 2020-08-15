import type knex from "knex";

import { USER, PERSON } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(USER, (t) => {
      defaults(k, t);
      t.string("login").notNullable().unique();
      t.string("password").notNullable();
      t.string("person").references("id").inTable(PERSON).notNullable();
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(USER);
  },
};
