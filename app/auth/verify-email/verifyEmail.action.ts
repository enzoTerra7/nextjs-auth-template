"use server";

import { createSession, decrypt } from "@/app/_lib/auth/session";
import { DiContainer } from "@/core/di/container";
import { isAfter } from "date-fns";
import { z } from "zod";
import { createServerAction } from "zsa";

export const verifyEmailAction = createServerAction()
  .input(
    z.object({
      token: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await decrypt(input.token);

    if (!session) {
      throw new Error("Invalid token");
    }

    if (isAfter(new Date(), new Date(session.expiresAt))) {
      throw new Error("Token expired");
    }

    const userBusiness = DiContainer.get("IAuthBusiness");

    const user = await userBusiness.verifyEmail(session?.userId);

    await createSession({
      role: user.role,
      userId: user.id,
      verified: true,
    });
  });
