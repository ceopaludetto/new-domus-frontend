import { BullModule } from "@nestjs/bull";
import { Module, Global } from "@nestjs/common";

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
        },
      }),
    }),
  ],
  providers: [MailQueueConsumer],
  exports: [BullModule],
})
export class QueueModule {}
