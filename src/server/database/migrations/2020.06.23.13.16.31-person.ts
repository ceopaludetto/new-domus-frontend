import type knex from "knex";

import { Gender } from "@/server/models/person.model";
import { PERSON } from "@/server/utils/constants";

import { defaults } from "../defaults";

export default {
  async up(k: ReturnType<typeof knex>) {
    return k.schema.createTable(PERSON, (t) => {
      defaults(k, t);
      t.string("name").notNullable();
      t.string("lastName").notNullable();
      t.string("email").notNullable();
      t.string("cpf", 11).notNullable();
      t.date("birthdate").notNullable();
      t.enum("gender", [Gender.F, Gender.M, Gender.N]).notNullable();
    });
  },

  async down(k: ReturnType<typeof knex>) {
    return k.schema.dropTable(PERSON);
  },
};
