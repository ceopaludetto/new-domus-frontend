import { BullModule } from "@nestjs/bull";
import { Module, Global } from "@nestjs/common";

import { EmailProcessor } from "./email.processor";
import { EmailService } from "./email.service";

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: "email",
      redis: {
        host: "localhost",
        port: 6379
      }
    })
  ],
  providers: [EmailService, EmailProcessor],
  exports: [EmailService]
})
export class EmailModule {}
