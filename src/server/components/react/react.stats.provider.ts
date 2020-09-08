import type { Provider } from "@nestjs/common";
import fs from "fs";
import { promisify } from "util";

import { STATS } from "@/server/utils/constants";

export const StatsProvider: Provider = {
  provide: STATS,
  useFactory: async () => {
    const readPromise = promisify(fs.readFile);

    const content = await readPromise(process.env.RAZZLE_LOADABLE_MANIFEST as string, "UTF-8");

    return JSON.parse(content);
  },
};
