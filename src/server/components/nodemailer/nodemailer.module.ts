import { Module, Global } from "@nestjs/common";

import { NodemailerProviders } from "./nodemailer.provider";
import { NodemailerService } from "./nodemailer.service";

@Global()
@Module({
  providers: [...NodemailerProviders, NodemailerService],
  exports: [NodemailerService]
})
export class NodemailerModule {}
