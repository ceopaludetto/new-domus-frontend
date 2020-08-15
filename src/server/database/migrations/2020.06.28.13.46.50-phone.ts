import type knex from "knex";

import { PHONE, PERSON } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(PHONE, (t) => {
      defaults(k, t);
      t.string("ddd", 2).notNullable();
      t.string("number", 9).notNullable();
      t.string("person").references("id").inTable(PERSON);
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(PHONE);
  },
};
