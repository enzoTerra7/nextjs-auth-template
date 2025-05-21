import { AuthBusiness } from "@/core/business/auth/auth.business";
import { UserRepository } from "@/core/repositories/user/user.repo";
import { EncryptService } from "@/core/services/encrypt/encrypt.service";
import { EmailService } from "@/core/services/email/email.service";

export function createAuthFactory() {
  const userRepository = new UserRepository();
  const encryptService = new EncryptService();
  const emailService = new EmailService();

  const authBusiness = new AuthBusiness(
    userRepository,
    encryptService,
    emailService
  );
  return authBusiness;
}
