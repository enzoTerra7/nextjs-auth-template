export interface IEmailService {
  sendEmail(
    from: string,
    to: string[],
    subject: string,
    template: React.ReactNode
  ): Promise<void>;
}
