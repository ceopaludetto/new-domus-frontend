import type { Provider } from "@nestjs/common";
import fs from "fs";
import { promisify } from "util";

import { STATS } from "@/server/utils/constants";

export const StatsProvider: Provider = {
  provide: STATS,
  useFactory: async () => {
    const readPromise = promisify(fs.readFile);
    const content: Record<string, any> = {};

    const legacy = await readPromise(process.env.MANIFEST as string, "UTF-8");
    content.legacy = JSON.parse(legacy);

    if (process.env.NODE_ENV === "production") {
      const esm = await readPromise(process.env.MANIFEST_ESM as string, "UTF-8");
      content.esm = JSON.parse(esm);
    }

    return content;
  },
};
