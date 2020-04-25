import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";

import { NodemailerService } from "@/server/components/nodemailer";
import { User } from "@/server/models";

@Processor("email")
export class EmailProcessor {
  public constructor(private readonly mailerService: NodemailerService) {}

  @Process("register")
  public async sendEmail({ data }: Job<User>) {
    try {
      const info = await this.mailerService.sendMail({
        to: data.person.email,
        from: "Carlos Eduardo <ceo.paludetto@gmail.com>",
        subject: "Test",
        template: "cadastro",
        context: {
          name: data.person.name
        }
      });

      return info;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
