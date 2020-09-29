import type knex from "knex";

import { SETTINGS, USER } from "@/server/utils/constants";
import { Theme } from "@/server/utils/enums";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(SETTINGS, (t) => {
      defaults(k, t);
      t.enum("theme", [Theme.DARK, Theme.LIGHT]).defaultTo(Theme.DARK).notNullable();
      t.string("user").references("id").inTable(USER);
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(SETTINGS);
  },
};
