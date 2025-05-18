"use server";

import { baseProcedure } from "@/app/_lib/procedures/base";
import { z } from "zod";

export const verifyEmailAction = baseProcedure
  .createServerAction()
  .input(
    z.object({
      token: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    // await ctx.userBusiness.verifyEmail(input.token);
  });
