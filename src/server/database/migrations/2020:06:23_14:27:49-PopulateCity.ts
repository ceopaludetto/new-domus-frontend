import axios from "axios";
import { QueryInterface, QueryTypes } from "sequelize";
import { generate } from "shortid";
import slugify from "slugify";

import { CITY, STATE } from "@/server/utils/constants";

export default {
  async up(queryInterface: QueryInterface) {
    const res: { code: number; id: string }[] = await queryInterface.sequelize.query(`SELECT * FROM "${STATE}"`, {
      type: QueryTypes.SELECT,
    });

    await Promise.all(
      res.map(async (r) => {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${r.code}/municipios`;
        const inner = await axios.get<{ nome: string; id: number }[]>(url);

        return queryInterface.bulkInsert(
          CITY,
          inner.data.map((c) => ({
            id: generate(),
            stateID: r.id,
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

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete(CITY, {});
  },
};
