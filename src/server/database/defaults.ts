import type Knex from "knex";

export const defaults = (k: ReturnType<typeof Knex>, t: Knex.CreateTableBuilder) => {
  t.string("id").primary().notNullable();
  t.timestamp("createdAt").defaultTo(k.fn.now()).notNullable();
  t.timestamp("updatedAt").defaultTo(k.fn.now()).notNullable();
};
