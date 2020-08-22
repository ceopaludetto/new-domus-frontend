import type knex from "knex";

import { USER } from "@/server/utils/constants";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.table(USER, (t) => {
      t.string("recoverToken").nullable();
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.table(USER, (t) => {
      t.dropColumn("recoverToken");
    });
  },
};
