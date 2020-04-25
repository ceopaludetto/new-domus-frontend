import { Provider } from "@nestjs/common";
import { createTransport } from "nodemailer";
import path from "path";

import { ConfigurationService } from "@/server/components/configuration";
import { MAILER, ADAPTER } from "@/server/utils/constants";

import { HandlebarsAdapter } from "./adapters/handlebars.adapter";

export const NodemailerProviders: Provider<any>[] = [
  {
    provide: MAILER,
    inject: [ConfigurationService],
    useFactory: ({ mailer: { host, port, auth } }: ConfigurationService) => {
      const transport = createTransport({ host, port, auth });

      return transport;
    }
  },
  {
    provide: ADAPTER,
    inject: [ConfigurationService],
    useFactory: ({
      mailer: {
        template: { dir }
      }
    }: ConfigurationService) => {
      const adapter = new HandlebarsAdapter({ dir: path.resolve(dir) });

      return adapter;
    }
  }
];
