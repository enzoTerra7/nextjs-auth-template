import "server-only";
import { UserRepository } from "@/core/repositories/user/user.repo";
import { EncryptService } from "@/core/services/encrypt/encrypt.service";
import { EmailService } from "@/core/services/email/email.service";

export class UserBusiness {
  private readonly _encryptService: EncryptService;
  private readonly _userRepository: UserRepository;
  private readonly _emailService: EmailService;
  constructor(
    userRepository: UserRepository,
    encryptService: EncryptService,
    emailService: EmailService
  ) {
    this._userRepository = userRepository;
    this._encryptService = encryptService;
    this._emailService = emailService;
  }

  async signin(data: { email: string; password: string }): Promise<{
    email: string;
    role: string;
    id: number;
    name: string;
    isVerified: boolean;
  }> {
    try {
      const user = await this._userRepository.signin(data);

      const isPasswordValid = await this._encryptService.compare(
        data.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      return {
        email: user.email,
        role: user.role,
        id: user.id,
        name: user.name,
        isVerified: user.email_verified_at !== null,
      };
    } catch (error) {
      throw new Error("Failed to login", {
        cause: error,
      });
    }
  }

  async signup(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<{
    email: string;
    role: string;
    id: number;
    name: string;
    isVerified: boolean;
  }> {
    try {
      const hashedPassword = await this._encryptService.hash(data.password);

      const user = await this._userRepository.signup({
        email: data.email,
        hashedPassword,
        name: data.name,
      });

      return {
        email: user.email,
        role: user.role,
        id: user.id,
        name: user.name,
        isVerified: user.email_verified_at !== null,
      };
    } catch (error) {
      throw new Error("Failed to signup", {
        cause: error,
      });
    }
  }

  async sendEmailVerification(data: {
    name: string;
    template: React.ReactNode;
  }): Promise<void> {
    await this._emailService.sendEmail(
      "Acme <onboarding@resend.dev>",
      ["enzotrr@gmail.com"],
      "Email Verification",
      data.template
    );
  }
}
