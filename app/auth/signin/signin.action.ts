"use server";

import { createSession } from "@/app/_lib/auth/session";
import { SignInSchema } from "./signin.definitions";
import { baseProcedure } from "@/app/_lib/procedures/base";
import { UserRoles } from "@/app/_lib/definitions";

export const signInAction = baseProcedure
  .createServerAction()
  .input(SignInSchema)
  .handler(async ({ input, ctx }) => {
    const user = await ctx.userBusiness.signin(input);

    await createSession({
      userId: user.id,
      role: user.role as UserRoles,
      verified: user.isVerified,
    });

    return {
      data: user,
    };
  });
