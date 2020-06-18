import { BullModule } from "@nestjs/bull";
import { Module, Global, OnModuleInit } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { ConfigurationService } from "@/server/components";

import { MailQueueConsumer } from "./mail.queue.consumer";

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: "mail",
      inject: [ConfigurationService],
      useFactory: ({ queue }: ConfigurationService) => ({
        redis: {
          host: queue.host,
          port: +queue.port,
          password: queue.password,
        },
      }),
    }),
  ],
  providers: [MailQueueConsumer],
  exports: [BullModule],
})
export class QueueModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(QueueModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info("QueueModule successfully started");
  }
}
