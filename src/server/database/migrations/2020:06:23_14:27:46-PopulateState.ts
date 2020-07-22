import axios from "axios";
import { QueryInterface } from "sequelize";
import { generate } from "shortid";

import { STATE } from "@/server/utils/constants";

export default {
  async up(queryInterface: QueryInterface) {
    const res = await axios.get<{ sigla: string; nome: string; id: number }[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    return queryInterface.bulkInsert(
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

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete(STATE, {});
  },
};
