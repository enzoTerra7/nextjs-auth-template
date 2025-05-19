"use server";

import { createSession } from "@/app/_lib/auth/session";
import { SignInSchema } from "./signin.definitions";
import { UserRoles } from "@/app/_lib/definitions";
import { createServerAction } from "zsa";
import { DiContainer } from "@/core/di/container";

export const signInAction = createServerAction()
  .input(SignInSchema)
  .handler(async ({ input }) => {
    const userBusiness = DiContainer.get("IUserBusiness");
    const user = await userBusiness.signin(input);

    await createSession({
      userId: user.id,
      role: user.role as UserRoles,
      verified: user.isVerified,
    });

    return {
      data: user,
    };
  });
