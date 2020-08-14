import axios from "axios";
import type knex from "knex";
import { generate } from "shortid";

import { STATE } from "@/server/utils/constants";

export default {
  async up(k: ReturnType<typeof knex>) {
    const res = await axios.get<{ sigla: string; nome: string; id: number }[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    return k.batchInsert(
      STATE,
      res.data
        .sort((a, b) => {
          if (a.nome < b.nome) {
            return -1;
          }
          if (a.nome > b.nome) {
            return 1;
          }

          return 0;
        })
        .map((s) => ({
          id: generate(),
          name: s.nome,
          initials: s.sigla,
          code: s.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
    );
  },

  async down(k: ReturnType<typeof knex>) {
    return k(STATE).delete();
  },
};
