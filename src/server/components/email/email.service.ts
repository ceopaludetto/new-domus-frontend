import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

import { User } from "@/server/models";

@Injectable()
export class EmailService {
  public constructor(@InjectQueue("email") private readonly emailQueue: Queue) {}

  public async sendRegisterEmail(user: User) {
    const job = await this.emailQueue.add("register", user);

    return job;
  }
}
