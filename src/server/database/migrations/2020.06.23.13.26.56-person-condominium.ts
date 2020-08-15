import type knex from "knex";

import { PERSON_CONDOMINIUM, CONDOMINIUM, PERSON } from "@/server/utils/constants";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(PERSON_CONDOMINIUM, (t) => {
      t.string("person").references("id").inTable(PERSON).notNullable();
      t.string("condominium").references("id").inTable(CONDOMINIUM).notNullable();
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(PERSON_CONDOMINIUM);
  },
};
