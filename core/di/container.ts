import { createUserFactory } from "./factories/user.factory";
import { DI_RETURN_TYPES } from "./types";

const resolver: {
  [key in keyof DI_RETURN_TYPES]: DI_RETURN_TYPES[key];
} = {
  IUserBusiness: createUserFactory(),
};

export class DiContainer {
  static get<T extends keyof DI_RETURN_TYPES>(
    serviceName: T
  ): DI_RETURN_TYPES[T] {
    return resolver[serviceName];
  }
}
