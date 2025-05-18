"use server";
import { EmailVerifyTemplate } from "../../_components/templates/email_verify";

import { createSession, encrypt } from "@/app/_lib/auth/session";
import { SignUpSchema } from "./signup.definitions";
import { baseProcedure } from "@/app/_lib/procedures/base";
import { UserRoles } from "@/app/_lib/definitions";

export const signUpAction = baseProcedure
  .createServerAction()
  .input(SignUpSchema)
  .handler(async ({ input, ctx }) => {
    const user = await ctx.userBusiness.signup({
      email: input.email,
      password: input.password,
      name: input.name,
    });

    await createSession({
      userId: user.id,
      role: user.role as UserRoles,
      verified: user.isVerified,
    });

    const verificationEmailToken = await encrypt({
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      role: user.role as UserRoles,
      userId: user.id,
    });

    ctx.userBusiness.sendEmailVerification({
      name: user.name,
      template: (
        <EmailVerifyTemplate name={user.name} token={verificationEmailToken} />
      ),
    });

    return {
      data: user,
    };
  });
