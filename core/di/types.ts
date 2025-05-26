import { IUserBusiness } from "../business/user/user.business.definition";
import { IAuthBusiness } from "../business/auth/auth.business.definition";
import { IEmailService } from "../services/email/email.service.details";
export interface DI_RETURN_TYPES {
  // Business Logics
  IUserBusiness: IUserBusiness;
  IAuthBusiness: IAuthBusiness;

  // Services
  IEmailService: IEmailService;
}
