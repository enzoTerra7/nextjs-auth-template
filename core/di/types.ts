import { IUserBusiness } from "../business/user/user.business.definition";
import { IAuthBusiness } from "../business/auth/auth.business.definition";
export interface DI_RETURN_TYPES {
  // Business Logics
  IUserBusiness: IUserBusiness;
  IAuthBusiness: IAuthBusiness;
}
