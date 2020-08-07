import { Provider } from "@nestjs/common";
import fs from "fs";
import { promisify } from "util";

import { STATS } from "@/server/utils/constants";

export const StatsProvider: Provider = {
  provide: STATS,
  useFactory: async () => {
    const readPromise = promisify(fs.readFile);

    const legacy = await readPromise(process.env.MANIFEST as string, "UTF-8");
    const esm = await readPromise(process.env.MANIFEST_ESM as string, "UTF-8");

    return { legacy: JSON.parse(legacy), esm: JSON.parse(esm) };
  },
};
