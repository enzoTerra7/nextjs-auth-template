import { UserBusiness } from "@/core/business/user/user.business";
import { UserRepository } from "@/core/repositories/user/user.repo";
import { EmailService } from "@/core/services/email/email.service";
import { EncryptService } from "@/core/services/encrypt/encrypt.service";

export function createUserFactory() {
  const userRepository = new UserRepository();
  const encryptService = new EncryptService();
  const emailService = new EmailService();

  const userBusiness = new UserBusiness(
    userRepository,
    encryptService,
    emailService
  );

  return userBusiness;
}
