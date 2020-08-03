import { Provider } from "@nestjs/common";
import fs from "fs";
import { promisify } from "util";

import { STATS } from "@/server/utils/constants";

export const StatsProvider: Provider = {
  provide: STATS,
  useFactory: async () => {
    const content = await promisify(fs.readFile)(process.env.MANIFEST as string, "UTF-8");

    return JSON.parse(content);
  },
};
