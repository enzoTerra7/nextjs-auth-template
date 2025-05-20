"use server";

import { adminProcedure } from "@/app/_lib/procedures/admin.procedure";
import { DiContainer } from "@/core/di/container";

export const getUsers = adminProcedure
  .createServerAction()
  .handler(async () => {
    const userBusiness = DiContainer.get("IUserBusiness");
    const users = await userBusiness.getUsers();

    return users;
  });
