import { NewUserWelcomeTemplate } from "../../../app/_components/templates/new_user_welcome";
import "server-only";
import { UserRepository } from "@/core/repositories/user/user.repo";
import { IUserBusiness } from "./user.business.definition";
import { User } from "@/db/table/user";
import { EmailService } from "@/core/services/email/email.service";
import { EncryptService } from "@/core/services/encrypt/encrypt.service";

export class UserBusiness implements IUserBusiness {
  private readonly _userRepository: UserRepository;
  private readonly _encryptionService: EncryptService;
  private readonly _emailService: EmailService;
  constructor(
    userRepository: UserRepository,
    encryptionService: EncryptService,
    emailService: EmailService
  ) {
    this._userRepository = userRepository;
    this._encryptionService = encryptionService;
    this._emailService = emailService;
  }

  async getUsers(): Promise<Omit<User, "password">[]> {
    const users = await this._userRepository.getUsers();

    return users.map((user) => ({
      id: user.id,
      createdAt: user.created_at,
      email: user.email,
      emailVerifiedAt: user.email_verified_at,
      name: user.name,
      role: user.role,
    }));
  }

  async createUser({
    name,
    email,
    role,
  }: {
    name: string;
    email: string;
    role: "admin" | "user";
  }) {
    console.log("creating user");
    const password = this._encryptionService.generateRandomPassword();
    console.log("password", password);
    const hashedPassword = await this._encryptionService.hash(password);
    console.log("hashedPassword", hashedPassword);

    await this._userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log("user created");

    this._emailService.sendEmail(
      "Acme <onboarding@resend.dev>",
      ["enzotrr@gmail.com"],
      <NewUserWelcomeTemplate name={name} password={password} />,
      "Email Verification"
    );

    console.log("email sent");

    return;
  }
}
