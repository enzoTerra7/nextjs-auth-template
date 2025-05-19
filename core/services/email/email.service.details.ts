export interface IEmailService {
  sendEmail(
    from: string,
    to: string[],
    template: React.ReactNode,
    subject?: string
  ): Promise<void>;
}
