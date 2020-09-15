import type knex from "knex";

import { BLOCK } from "@/server/utils/constants";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.table(BLOCK, (t) => {
      t.string("image").nullable();
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.table(BLOCK, (t) => {
      t.dropColumn("image");
    });
  },
};
