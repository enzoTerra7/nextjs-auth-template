import { Resend } from "resend";
import type { IEmailService } from "./email.service.details";

export class EmailService implements IEmailService {
  private readonly email_client: Resend;
  constructor() {
    // pass and setup repositories here
    this.email_client = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(
    from: string,
    to: string[],
    template: React.ReactNode,
    subject?: string
  ): Promise<void> {
    await this.email_client.emails.send({
      from,
      to,
      subject: subject || "No subject",
      react: template,
    });
  }
}
