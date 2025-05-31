import "server-only";
import { NewUserWelcomeTemplate } from "../../../app/_components/templates/new_user_welcome";
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
    const password = this._encryptionService.generateRandomPassword();
    const hashedPassword = await this._encryptionService.hash(password);

    await this._userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    this._emailService.sendEmail(
      "Acme <onboarding@resend.dev>",
      ["enzotrr@gmail.com"],
      <NewUserWelcomeTemplate name={name} password={password} />,
      "Email Verification"
    );

    return;
  }

  async editUser(
    id: number,
    { name, role }: { name: string; role: "admin" | "user" }
  ) {
    await this._userRepository.editUser(id, {
      name,
      role,
    });
  }

  async deleteUser(id: number) {
    await this._userRepository.deleteUser(id);
  }
}
