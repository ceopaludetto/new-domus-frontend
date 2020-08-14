import axios from "axios";
import type knex from "knex";
import { generate } from "shortid";
import slugify from "slugify";

import { CITY, STATE } from "@/server/utils/constants";

export default {
  async up(k: ReturnType<typeof knex>) {
    const res = await k(STATE).select<{ code: number; id: string }[]>();

    await Promise.all(
      res.map(async (r) => {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${r.code}/municipios`;
        const inner = await axios.get<{ nome: string; id: number }[]>(url);

        return k.batchInsert(
          CITY,
          inner.data
            .sort((a, b) => {
              if (a.nome < b.nome) {
                return -1;
              }
              if (a.nome > b.nome) {
                return 1;
              }

              return 0;
            })
            .map((c) => ({
              id: generate(),
              state: r.id,
              name: c.nome,
              code: c.id,
              slug: slugify(c.nome, { lower: true, strict: true }),
              createdAt: new Date(),
              updatedAt: new Date(),
            }))
        );
      })
    );
  },

  async down(k: ReturnType<typeof knex>) {
    return k(CITY).delete();
  },
};
