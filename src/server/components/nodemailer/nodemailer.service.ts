import { Injectable, Inject } from "@nestjs/common";
import { createTransport, SendMailOptions } from "nodemailer";

import { MAILER, ADAPTER } from "@/server/utils/constants";

import { HandlebarsAdapter } from "./adapters/handlebars.adapter";

@Injectable()
export class NodemailerService {
  public constructor(
    @Inject(MAILER) private readonly mailer: ReturnType<typeof createTransport>,
    @Inject(ADAPTER) private readonly adapter: HandlebarsAdapter
  ) {
    this.initTemplateAdapter();
  }

  private initTemplateAdapter() {
    this.mailer.use("compile", (mail, callback) => {
      if (mail.data.html) {
        return callback();
      }

      return this.adapter.compile(mail, callback);
    });
  }

  public async sendMail(
    options: SendMailOptions & {
      template?: string;
      context?: {
        [index: string]: any;
      };
    }
  ) {
    return this.mailer.sendMail(options);
  }
}
