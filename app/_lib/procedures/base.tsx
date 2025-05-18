import { UserRepository } from "@/core/repositories/user/user.repo";
import { UserBusiness } from "@/core/business/user/user.business";
import { createServerActionProcedure } from "zsa";
import { EncryptService } from "@/core/services/encrypt/encrypt.service";
import { EmailService } from "@/core/services/email/email.service";

export const baseProcedure = createServerActionProcedure().handler(() => {
  // repositories
  const userRepository = new UserRepository();

  // services
  const encryptService = new EncryptService();
  const emailService = new EmailService();

  // business logics
  const userBusiness = new UserBusiness(
    userRepository,
    encryptService,
    emailService
  );

  return {
    userBusiness,
  };
});
